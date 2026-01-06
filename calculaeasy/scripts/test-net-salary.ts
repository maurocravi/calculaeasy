// scripts/test-net-salary.ts
import { calculateNetSalary } from "../src/lib/calculations/uy/salary/netSalary";
import { IRPF_CONFIG_2025 } from "../src/lib/calculations/uy/irpf/tables-2025";

// Ajustá estos rates si ya los cambiaste
const contributionRates = {
    retirementRate: 0.15,   // Montepío
    frlRate: 0.001,       // FRL
};

// Helper para imprimir porcentaje
const pct = (n: number) => `${Math.round(n * 10000) / 100}%`;

// Casos de prueba
const cases = [
    {
        label: "Nominal 40k - sin hijos, sin cónyuge (FONASA mínimo)",
        input: {
            nominalMonthly: 40000,
            currency: "UYU" as const,
            exchangeRate: 40,
            year: 2025 as const,
            hasChildren: false,
            spouseWithoutSNIS: false,
        },
    },
    {
        label: "Nominal 70k - sin hijos, sin cónyuge",
        input: {
            nominalMonthly: 70000,
            currency: "UYU" as const,
            exchangeRate: 40,
            year: 2025 as const,
            hasChildren: false,
            spouseWithoutSNIS: false,
        },
    },
    {
        label: "Nominal 90k - con hijos, sin cónyuge",
        input: {
            nominalMonthly: 90000,
            currency: "UYU" as const,
            exchangeRate: 40,
            year: 2025 as const,
            hasChildren: true,
            spouseWithoutSNIS: false,
        },
    },
    {
        label: "Nominal 98.640 (threshold) - sin hijos, sin cónyuge (deducción 14%)",
        input: {
            nominalMonthly: 98640,
            currency: "UYU" as const,
            exchangeRate: 40,
            year: 2025 as const,
            hasChildren: false,
            spouseWithoutSNIS: false,
        },
    },
    {
        label: "Nominal 100k - sin hijos, sin cónyuge (deducción 8%)",
        input: {
            nominalMonthly: 100000,
            currency: "UYU" as const,
            exchangeRate: 40,
            year: 2025 as const,
            hasChildren: false,
            spouseWithoutSNIS: false,
        },
    },
    {
        label: "Nominal 120k - con hijos y cónyuge sin SNIS (FONASA alto)",
        input: {
            nominalMonthly: 120000,
            currency: "UYU" as const,
            exchangeRate: 40,
            year: 2025 as const,
            hasChildren: true,
            spouseWithoutSNIS: true,
        },
    },
    {
        label: "Nominal 200k - sin hijos, sin cónyuge",
        input: {
            nominalMonthly: 200000,
            currency: "UYU" as const,
            exchangeRate: 40,
            year: 2025 as const,
            hasChildren: false,
            spouseWithoutSNIS: false,
        },
    },
];

function printCase(label: string, result: any) {
    console.log("\n============================================================");
    console.log(label);
    console.log("============================================================");

    console.log(`Nominal:                 $${Math.round(result.nominalUYU).toLocaleString("es-UY")}`);
    console.log(`Aportes total:           $${Math.round(result.contributions.total).toLocaleString("es-UY")}`);
    console.log(`  - Montepío:            $${Math.round(result.contributions.retirement).toLocaleString("es-UY")}`);
    console.log(`  - FONASA (${pct(result.contributions.fonasaRateUsed)}): $${Math.round(result.contributions.fonasa).toLocaleString("es-UY")}`);
    console.log(`  - FRL:                 $${Math.round(result.contributions.frl).toLocaleString("es-UY")}`);

    console.log(`Base imponible IRPF:     $${Math.round(result.taxableBaseUYU).toLocaleString("es-UY")}`);

    console.log(`IRPF bruto:              $${Math.round(result.irpf.gross).toLocaleString("es-UY")}`);
    console.log(`Deducción general (${pct(result.irpf.generalDeductionRate)}): -$${Math.round(result.irpf.generalDeductionAmount).toLocaleString("es-UY")}`);
    console.log(`IRPF neto:               $${Math.round(result.irpf.amount).toLocaleString("es-UY")}`);

    console.log(`Descuentos total:        $${Math.round(result.totalDiscounts).toLocaleString("es-UY")}`);
    console.log(`Líquido estimado:        $${Math.round(result.netUYU).toLocaleString("es-UY")}`);
    console.log(`Tasa efectiva:           ${pct(result.effectiveDiscountRate)}`);

    // Validaciones rápidas
    if (result.irpf.amount < 0) console.warn("⚠️ IRPF neto negativo (no debería pasar)");
    if (result.netUYU > result.nominalUYU) console.warn("⚠️ Neto mayor al nominal (no debería pasar)");
}

for (const c of cases) {
    const res = calculateNetSalary(c.input, contributionRates, IRPF_CONFIG_2025);
    printCase(c.label, res);
}

console.log("\n✅ Tests finalizados.");
