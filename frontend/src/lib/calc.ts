import { VBUDGET_CONFIG } from "./vbudgetConfig";

export type Item = { title: string; category: string; qty: number; unit: string; rate: number };

export function calcTotals(items: Item[], agencyFeePct?: number) {
  const firstTotal = items.reduce((sum, it) => sum + it.qty * it.rate, 0);
  const agencyPct = typeof agencyFeePct === "number" ? agencyFeePct : VBUDGET_CONFIG.defaultAgencyFeePct;
  const agencyFee = (firstTotal * agencyPct) / 100;
  const taxableTotal = firstTotal + agencyFee;
  const gst = (taxableTotal * VBUDGET_CONFIG.gstPercent) / 100;
  const grandTotal = taxableTotal + gst;
  return { firstTotal, agencyPct, agencyFee, taxableTotal, gst, grandTotal };
}
