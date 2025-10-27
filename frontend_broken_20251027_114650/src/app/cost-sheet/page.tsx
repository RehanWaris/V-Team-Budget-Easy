"use client";

import { useMemo, useState } from "react";
import { calcTotals, Item } from "@/lib/calc";
import { VBUDGET_CONFIG } from "@/lib/vbudgetConfig";

const seed: Item[] = [
  { title: "Sound System (Line Array)", category: "Sound", qty: 1, unit: "setup", rate: 75000 },
  { title: "Stage Fabrication (36x24)", category: "Fabrication", qty: 1, unit: "setup", rate: 55000 },
  { title: "Backdrop Flex Printing", category: "Flex", qty: 400, unit: "sqft", rate: 45 }
];

export default function CostSheetPage() {
  const [items, setItems] = useState<Item[]>(seed);
  const [agencyPct, setAgencyPct] = useState<number>(VBUDGET_CONFIG.defaultAgencyFeePct);

  const totals = useMemo(() => calcTotals(items, agencyPct), [items, agencyPct]);

  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-semibold">V-Budget • Cost Sheet</h1>

      <div className="flex items-center gap-3">
        <label className="text-sm">Agency Fee %</label>
        <input
          type="number"
          className="border rounded px-2 py-1 w-24"
          value={agencyPct}
          onChange={(e) => setAgencyPct(Number(e.target.value || 0))}
        />
        <span className="text-xs text-gray-500">GST @ {VBUDGET_CONFIG.gstPercent}%</span>
      </div>

      <table className="w-full border text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="border px-2 py-1 text-left">Item</th>
            <th className="border px-2 py-1">Category</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Unit</th>
            <th className="border px-2 py-1">Rate</th>
            <th className="border px-2 py-1">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, i) => {
            const subtotal = it.qty * it.rate;
            return (
              <tr key={i}>
                <td className="border px-2 py-1">
                  <input
                    className="w-full outline-none"
                    value={it.title}
                    onChange={(e) => {
                      const v = [...items]; v[i] = { ...v[i], title: e.target.value }; setItems(v);
                    }}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    className="w-full outline-none"
                    value={it.category}
                    onChange={(e) => {
                      const v = [...items]; v[i] = { ...v[i], category: e.target.value }; setItems(v);
                    }}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="number"
                    className="w-24 outline-none"
                    value={it.qty}
                    onChange={(e) => {
                      const v = [...items]; v[i] = { ...v[i], qty: Number(e.target.value || 0) }; setItems(v);
                    }}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    className="w-24 outline-none"
                    value={it.unit}
                    onChange={(e) => {
                      const v = [...items]; v[i] = { ...v[i], unit: e.target.value }; setItems(v);
                    }}
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="number"
                    className="w-32 outline-none"
                    value={it.rate}
                    onChange={(e) => {
                      const v = [...items]; v[i] = { ...v[i], rate: Number(e.target.value || 0) }; setItems(v);
                    }}
                  />
                </td>
                <td className="border px-2 py-1 text-right">₹{subtotal.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <div>First Total: <b>₹{totals.firstTotal.toFixed(2)}</b></div>
          <div>Agency Fee ({totals.agencyPct}%): <b>₹{totals.agencyFee.toFixed(2)}</b></div>
          <div>Taxable Total: <b>₹{totals.taxableTotal.toFixed(2)}</b></div>
          <div>GST @ {VBUDGET_CONFIG.gstPercent}%: <b>₹{totals.gst.toFixed(2)}</b></div>
          <div className="text-lg">Grand Total: <b>₹{totals.grandTotal.toFixed(2)}</b></div>
        </div>
      </div>
    </main>
  );
}
