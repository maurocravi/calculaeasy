import { round2 } from "../../utils";

export type VatMode = "add" | "remove";

export type VatInput = {
  mode: VatMode;
  amount: number;   // monto base o final según modo (en la moneda original)
  rate: number;     // IVA en decimal: 0.22 o 0.10
  currency: "UYU" | "USD";
  exchangeRate?: number;
};

export type VatOutput = {
  net: number;      // sin IVA
  vat: number;      // monto IVA
  gross: number;    // con IVA
};

export function calculateVat(input: VatInput): VatOutput {
  const { mode, rate } = input;
  const exchangeRate = input.exchangeRate || 1;
  let amount = input.amount;

  if (input.currency === "USD") {
    amount = amount * exchangeRate;
  }

  if (rate < 0) {
    return { net: 0, vat: 0, gross: 0 };
  }

  if (mode === "add") {
    // amount es neto (sin IVA)
    const net = amount;
    const vat = round2(net * rate);
    const gross = round2(net + vat);
    return { net: round2(net), vat, gross };
  }

  // mode === "remove"
  // amount es bruto (con IVA)
  const gross = amount;
  const net = round2(gross / (1 + rate));
  const vat = round2(gross - net);
  return { net, vat, gross: round2(gross) };
}
