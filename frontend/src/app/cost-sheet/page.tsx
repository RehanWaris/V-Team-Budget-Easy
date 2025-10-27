
"use client";

import { useMemo, useState } from "react";

/* ------------------------ Event details model ------------------------ */
type EventDetails = {
  client: string;
  eventName: string;
  venue: string;
  date: string; // keep simple for now
};

/* ------------------------ Vendors (prototype) ------------------------ */
type Vendor = {
  id: string;
  name: string;
  category: string;        // e.g., "Flex", "Fabrication", "Sound", "Lighting"
  ratePerUnit: number;     // per sqft / per unit depending on category
  rating: number;          // 1..5
};

const VENDORS: Vendor[] = [
  { id: "v1", name: "PrintX Flex", category: "Flex",        ratePerUnit: 45,  rating: 4.6 },
  { id: "v2", name: "MetroFlex",   category: "Flex",        ratePerUnit: 42,  rating: 4.1 },
  { id: "v3", name: "StageCraft",  category: "Fabrication", ratePerUnit: 55000, rating: 4.7 },
  { id: "v4", name: "ProAudio",    category: "Sound",       ratePerUnit: 75000, rating: 4.4 },
  { id: "v5", name: "LitePro",     category: "Lighting",    ratePerUnit: 1200,  rating: 4.5 },
];

/* ------------------------ Cost sheet rows ------------------------ */
type Row = {
  id: number;
  category: string; // optional but helps advisor
  item: string;
  L: number;        // feet
  W: number;        // feet
  H: number;        // feet
  qty: number;
  rate: number;     // INR per unit (unit depends on category; for Flex it'll be per sqft)
  days: number;
  chosenVendorId?: string;
};

const seedRows: Row[] = [
  { id: 1, category: "Fabrication", item: "Stage Setup", L: 36, W: 24, H: 4, qty: 1, rate: 55000, days: 1 },
  { id: 2, category: "Lighting",    item: "Lighting",    L: 10, W: 8,  H: 2, qty: 10, rate: 1200,  days: 2 },
  { id: 3, category: "Flex",        item: "Backdrop Flex Printing", L: 20, W: 12, H: 2.5, qty: 1, rate: 45, days: 1 },
];

/* ------------------------ Helpers ------------------------ */
function areaFromLWH(L: number, W: number, H: number): number {
  const dims = [Number(L)||0, Number(W)||0, Number(H)||0].sort((a,b)=>b-a); // desc
  return Math.max(0, dims[0] * dims[1]); // product of two largest; example: 20x12x2.5 -> 240
}

function toNum(v: any) { const n = Number(v); return isNaN(n) ? 0 : n; }

/* ------------------------ Page ------------------------ */
export default function CostSheetPage() {
  const [eventDetails, setEventDetails] = useState<EventDetails>({
    client: "",
    eventName: "",
    venue: "",
    date: "",
  });

  const [rows, setRows] = useState<Row[]>(seedRows);
  const [agencyFeePct, setAgencyFeePct] = useState<number>(10);
  const GST_PCT = 18;

  const handleRowChange = (id: number, field: keyof Row, value: any) => {
    setRows((prev) => prev.map(r => r.id === id ? { ...r, [field]: field === "item" || field === "category" ? String(value) : toNum(value) } : r));
  };

  const addRow = () => {
    const nid = (rows.at(-1)?.id ?? 0) + 1;
    setRows([...rows, { id: nid, category: "", item: "", L: 0, W: 0, H: 0, qty: 1, rate: 0, days: 1 }]);
  };

  const removeRow = (id: number) => setRows(rows.filter(r => r.id !== id));

  // Suggest vendor: pick vendor in same category with best score (lower rate & higher rating)
  const suggestVendor = (r: Row) => {
    const candidates = VENDORS.filter(v => !r.category || v.category.toLowerCase() === r.category.toLowerCase());
    if (candidates.length === 0) return;
    const best = candidates.reduce((best, v) => {
      const score = v.ratePerUnit / (v.rating || 1); // lower better
      const bestScore = (best.ratePerUnit / (best.rating || 1));
      return score < bestScore ? v : best;
    }, candidates[0]);

    // apply chosen vendor rate; for Flex, rate is per sqft; for others treat as per unit
    setRows(prev => prev.map(x => x.id === r.id ? { ...x, chosenVendorId: best.id, rate: best.ratePerUnit, category: best.category } : x ));
  };

  // Totals
  const calc = useMemo(() => {
    const withCalcs = rows.map(r => {
      const area = areaFromLWH(r.L, r.W, r.H);
      const rowSubtotal = area * r.qty * r.rate * r.days;
      return { ...r, area, rowSubtotal };
    });

    const subtotal = withCalcs.reduce((s, r) => s + r.rowSubtotal, 0);
    const agency = subtotal * (agencyFeePct / 100);
    const gst = (subtotal + agency) * (GST_PCT / 100);
    const grand = subtotal + agency + gst;

    return { lines: withCalcs, subtotal, agency, gst, grand };
  }, [rows, agencyFeePct]);

  return (
    <main className="p-8 space-y-6">
      {/* Event details */}
      <section className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-xl font-semibold mb-3">Event Details</h2>
        <div className="grid md:grid-cols-4 gap-3">
          <input
            className="border rounded px-2 py-1"
            placeholder="Client Name"
            value={eventDetails.client}
            onChange={e=>setEventDetails({...eventDetails, client:e.target.value})}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Event Name / Type"
            value={eventDetails.eventName}
            onChange={e=>setEventDetails({...eventDetails, eventName:e.target.value})}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Venue / City"
            value={eventDetails.venue}
            onChange={e=>setEventDetails({...eventDetails, venue:e.target.value})}
          />
          <input
            className="border rounded px-2 py-1"
            placeholder="Date(s)"
            value={eventDetails.date}
            onChange={e=>setEventDetails({...eventDetails, date:e.target.value})}
          />
        </div>
      </section>

      <h1 className="text-2xl font-semibold">V-Budget • Cost Sheet</h1>

      <section className="bg-white rounded-2xl shadow p-4 overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead className="bg-gray-50">
            <tr>
              <th className="border p-2 text-left">Category</th>
              <th className="border p-2 text-left">Item</th>
              <th className="border p-2">L (ft)</th>
              <th className="border p-2">W (ft)</th>
              <th className="border p-2">H (ft)</th>
              <th className="border p-2">Total Area (ft²)</th>
              <th className="border p-2">Qty</th>
              <th className="border p-2">Rate (₹)</th>
              <th className="border p-2">Days</th>
              <th className="border p-2">Subtotal (₹)</th>
              <th className="border p-2">Vendor</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {calc.lines.map((r) => (
              <tr key={r.id}>
                <td className="border p-1">
                  <select
                    className="w-40 border rounded px-2 py-1"
                    value={r.category}
                    onChange={(e)=>handleRowChange(r.id,"category", e.target.value)}
                  >
                    <option value="">—</option>
                    <option>Flex</option>
                    <option>Fabrication</option>
                    <option>Sound</option>
                    <option>Lighting</option>
                    <option>Misc</option>
                  </select>
                </td>
                <td className="border p-1">
                  <input
                    className="w-64 border rounded px-2 py-1"
                    value={r.item}
                    onChange={(e)=>handleRowChange(r.id, "item", e.target.value)}
                  />
                </td>
                <td className="border p-1 text-center">
                  <input type="number" className="w-20 border rounded px-2 py-1 text-right"
                    value={r.L} onChange={(e)=>handleRowChange(r.id,"L", e.target.value)} />
                </td>
                <td className="border p-1 text-center">
                  <input type="number" className="w-20 border rounded px-2 py-1 text-right"
                    value={r.W} onChange={(e)=>handleRowChange(r.id,"W", e.target.value)} />
                </td>
                <td className="border p-1 text-center">
                  <input type="number" className="w-20 border rounded px-2 py-1 text-right"
                    value={r.H} onChange={(e)=>handleRowChange(r.id,"H", e.target.value)} />
                </td>
                <td className="border p-1 text-right">{r.area.toFixed(2)}</td>
                <td className="border p-1 text-center">
                  <input type="number" className="w-16 border rounded px-2 py-1 text-right"
                    value={r.qty} onChange={(e)=>handleRowChange(r.id,"qty", e.target.value)} />
                </td>
                <td className="border p-1 text-center">
                  <input type="number" className="w-24 border rounded px-2 py-1 text-right"
                    value={r.rate} onChange={(e)=>handleRowChange(r.id,"rate", e.target.value)} />
                </td>
                <td className="border p-1 text-center">
                  <input type="number" className="w-16 border rounded px-2 py-1 text-right"
                    value={r.days} onChange={(e)=>handleRowChange(r.id,"days", e.target.value)} />
                </td>
                <td className="border p-1 text-right">₹{r.rowSubtotal.toLocaleString(undefined,{maximumFractionDigits:2})}</td>

                <td className="border p-1">
                  <select
                    className="w-48 border rounded px-2 py-1"
                    value={r.chosenVendorId ?? ""}
                    onChange={(e)=>{
                      const v = VENDORS.find(v=>v.id===e.target.value);
                      if (!v) { handleRowChange(r.id, "chosenVendorId", ""); return; }
                      // adopt rate from vendor
                      setRows(prev=>prev.map(x=>x.id===r.id?{...x, chosenVendorId:v.id, rate:v.ratePerUnit, category:v.category}:x));
                    }}
                  >
                    <option value="">— Choose —</option>
                    {VENDORS
                      .filter(v => !r.category || v.category.toLowerCase()===r.category.toLowerCase())
                      .map(v => (
                        <option key={v.id} value={v.id}>
                          {v.name} • ₹{v.ratePerUnit}/unit • ⭐ {v.rating}
                        </option>
                      ))}
                  </select>
                  <button
                    className="ml-2 px-2 py-1 text-xs rounded bg-indigo-600 text-white"
                    onClick={()=>suggestVendor(r)}
                    title="Suggest based on price & rating"
                  >
                    Suggest
                  </button>
                </td>

                <td className="border p-1">
                  <button className="text-red-600 text-sm" onClick={()=>removeRow(r.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addRow}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
        >
          + Add Item
        </button>

        {/* Totals */}
        <div className="mt-8 space-y-1 text-right">
          <div>Subtotal: ₹{calc.subtotal.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
          <div className="inline-flex items-center gap-2">
            <span>Agency Fee (%):</span>
            <input
              type="number"
              className="w-20 border rounded text-center"
              value={agencyFeePct}
              onChange={(e)=>setAgencyFeePct(toNum(e.target.value))}
            />
            <span>→ ₹{calc.agency.toLocaleString(undefined,{maximumFractionDigits:2})}</span>
          </div>
          <div>GST (18%): ₹{calc.gst.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
          <div className="text-lg font-semibold">Grand Total: ₹{calc.grand.toLocaleString(undefined,{maximumFractionDigits:2})}</div>
        </div>
      </section>
    </main>
  );
}
