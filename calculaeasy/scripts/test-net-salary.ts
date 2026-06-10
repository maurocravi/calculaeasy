// scripts/test-net-salary.ts
import { calculateNetSalary } from "../src/lib/calculations/uy/salary/netSalary";
import { IRPF_CONFIG_2026 } from "../src/lib/calculations/uy/irpf/tables-2026";
import { CONTRIBUTION_CONFIG_2026 } from "../src/lib/calculations/uy/salary/contributions";

const pct = (n: number) => `${Math.round(n * 10000) / 100}%`;

// Valores esperados calculados a mano con el mecanismo oficial DGI/BPS 2026:
// franjas sobre nominal (+6% ficto si > 10 BPC = $68.640), crédito del
// 14%/8% (umbral 15 BPC = $102.960) sobre aportes + deducción por hijo
// ($11.440/mes). Tope jubilatorio: $288.836.
const cases = [
    {
        label: "Nominal 40k - sin hijos ni cónyuge (debajo del MNI, IRPF 0)",
        input: { nominalMonthly: 40000, childrenCount: 0, spouseWithoutSNIS: false },
        expected: { contributions: 7840, irpf: 0, net: 32160 },
    },
    {
        label: "Nominal 70k - sin hijos (aplica ficto 6%, crédito 14%)",
        input: { nominalMonthly: 70000, childrenCount: 0, spouseWithoutSNIS: false },
        expected: { contributions: 13720, irpf: 972.4, net: 55307.6 },
    },
    {
        label: "Nominal 90k - 1 hijo (FONASA 6% + deducción por hijo)",
        input: { nominalMonthly: 90000, childrenCount: 1, spouseWithoutSNIS: false },
        expected: { contributions: 18990, irpf: 1813, net: 69197 },
    },
    {
        label: "Nominal 102.960 (15 BPC, borde del crédito 14%)",
        input: { nominalMonthly: 102960, childrenCount: 0, spouseWithoutSNIS: false },
        expected: { contributions: 20180.16, irpf: 5864.6, net: 76915.24 },
    },
    {
        label: "Nominal 120k - 1 hijo y cónyuge sin SNIS (FONASA 8%, crédito 8%)",
        input: { nominalMonthly: 120000, childrenCount: 1, spouseWithoutSNIS: true },
        expected: { contributions: 27720, irpf: 9892, net: 82388 },
    },
    {
        label: "Nominal 200k - sin hijos",
        input: { nominalMonthly: 200000, childrenCount: 0, spouseWithoutSNIS: false },
        expected: { contributions: 39200, irpf: 30301.6, net: 130498.4 },
    },
    {
        label: "Nominal 350k - sin hijos (supera el tope jubilatorio)",
        input: { nominalMonthly: 350000, childrenCount: 0, spouseWithoutSNIS: false },
        expected: { contributions: 59425.4, irpf: 68989.57, net: 221585.03 },
    },
];

let failures = 0;

function check(label: string, actual: number, expected: number) {
    const ok = Math.abs(actual - expected) <= 1;
    if (!ok) {
        failures++;
        console.error(`  ❌ ${label}: esperado ${expected}, obtenido ${actual}`);
    }
    return ok;
}

for (const c of cases) {
    const result = calculateNetSalary(
        {
            nominalMonthly: c.input.nominalMonthly,
            currency: "UYU",
            exchangeRate: 40,
            year: 2026,
            childrenCount: c.input.childrenCount,
            spouseWithoutSNIS: c.input.spouseWithoutSNIS,
        },
        CONTRIBUTION_CONFIG_2026,
        IRPF_CONFIG_2026,
    );

    console.log("\n============================================================");
    console.log(c.label);
    console.log("============================================================");

    console.log(`Nominal:                  $${result.nominalUYU.toLocaleString("es-UY")}`);
    console.log(`Aportes total:            $${result.contributions.total.toLocaleString("es-UY")}`);
    console.log(`  - Montepío:             $${result.contributions.retirement.toLocaleString("es-UY")}`);
    console.log(`  - FONASA (${pct(result.contributions.fonasaRateUsed)}):       $${result.contributions.fonasa.toLocaleString("es-UY")}`);
    console.log(`  - FRL:                  $${result.contributions.frl.toLocaleString("es-UY")}`);

    console.log(`Base IRPF${result.irpf.fictoApplied ? " (ficto +6%)" : "          "}:    $${result.irpf.computedBase.toLocaleString("es-UY")}`);
    console.log(`IRPF por franjas:         $${result.irpf.gross.toLocaleString("es-UY")}`);
    console.log(`Deducciones admitidas:    $${result.irpf.totalDeductions.toLocaleString("es-UY")}`);
    console.log(`Crédito (${pct(result.irpf.creditRate)}):           -$${result.irpf.creditAmount.toLocaleString("es-UY")}`);
    console.log(`IRPF retenido:            $${result.irpf.amount.toLocaleString("es-UY")}`);

    console.log(`Descuentos total:         $${result.totalDiscounts.toLocaleString("es-UY")}`);
    console.log(`Líquido estimado:         $${result.netUYU.toLocaleString("es-UY")}`);
    console.log(`Tasa efectiva:            ${pct(result.effectiveDiscountRate)}`);

    check("Aportes", result.contributions.total, c.expected.contributions);
    check("IRPF", result.irpf.amount, c.expected.irpf);
    check("Líquido", result.netUYU, c.expected.net);

    if (result.irpf.amount < 0) console.warn("⚠️ IRPF negativo (no debería pasar)");
    if (result.netUYU > result.nominalUYU) console.warn("⚠️ Neto mayor al nominal (no debería pasar)");
}

if (failures > 0) {
    console.error(`\n❌ ${failures} verificaciones fallaron.`);
    process.exit(1);
}

console.log("\n✅ Todos los casos coinciden con los valores esperados.");
