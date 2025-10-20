diff --git a/frontend/src/app/page.tsx b/frontend/src/app/page.tsx
new file mode 100644
index 0000000000000000000000000000000000000000..37dc93949cbf67f0c558a64018ed5ea109a0f21f
--- /dev/null
+++ b/frontend/src/app/page.tsx
@@ -0,0 +1,114 @@
+import Link from "next/link";
+import { ArrowRightIcon, ShieldCheckIcon, SparklesIcon } from "@heroicons/react/24/outline";
+
+const highlights = [
+  {
+    title: "Budget Faster",
+    description: "Upload briefs and let V-Budget pre-fill cost sheets using approved vendor rates.",
+    icon: SparklesIcon
+  },
+  {
+    title: "Stay Compliant",
+    description: "OTP-gated approvals keep vendor rates and budgets in check before they reach clients.",
+    icon: ShieldCheckIcon
+  }
+];
+
+export default function HomePage() {
+  return (
+    <main className="flex min-h-screen flex-col bg-gradient-to-br from-brand-white via-white to-blue-50">
+      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
+        <div className="flex items-center gap-2 text-xl font-semibold text-brand-black">
+          <span className="rounded-md bg-brand-blue px-2 py-1 text-white">V</span>
+          <span>V-Budget</span>
+        </div>
+        <div className="flex items-center gap-4 text-sm font-medium">
+          <Link href="/" className="text-brand-black/70 hover:text-brand-black">
+            Features
+          </Link>
+          <Link href="/" className="text-brand-black/70 hover:text-brand-black">
+            Workflow
+          </Link>
+          <Link
+            href="/(auth)/login"
+            className="rounded-full bg-brand-blue px-4 py-2 text-white shadow-card transition hover:bg-blue-800"
+          >
+            Employee Login
+          </Link>
+        </div>
+      </nav>
+
+      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-12 px-6 py-12 lg:flex-row lg:items-center">
+        <div className="flex-1 space-y-8">
+          <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-brand-blue">
+            Blueprint ready for coding
+          </span>
+          <h1 className="text-4xl font-bold text-brand-black md:text-5xl">
+            Make event budgeting effortless for the Voiceworx team.
+          </h1>
+          <p className="max-w-xl text-lg text-brand-black/70">
+            Centralize vendor rates, automate cost sheets, and approve budgets in minutes. V-Budget keeps every step—from vendor onboarding to final client-ready proposals—organized, auditable, and fast.
+          </p>
+          <div className="flex flex-wrap items-center gap-4">
+            <Link
+              href="/(auth)/login"
+              className="inline-flex items-center gap-2 rounded-full bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-blue-800"
+            >
+              Start Budgeting
+              <ArrowRightIcon className="h-4 w-4" />
+            </Link>
+            <Link href="/" className="text-sm font-semibold text-brand-blue hover:underline">
+              View Roadmap
+            </Link>
+          </div>
+          <dl className="grid gap-6 md:grid-cols-2">
+            {highlights.map((item) => (
+              <div
+                key={item.title}
+                className="flex items-start gap-4 rounded-2xl border border-blue-100/60 bg-white/80 p-6 shadow-sm backdrop-blur"
+              >
+                <item.icon className="h-8 w-8 text-brand-blue" />
+                <div>
+                  <dt className="text-lg font-semibold text-brand-black">{item.title}</dt>
+                  <dd className="mt-2 text-sm text-brand-black/70">{item.description}</dd>
+                </div>
+              </div>
+            ))}
+          </dl>
+        </div>
+        <div className="flex-1">
+          <div className="rounded-3xl border border-blue-100 bg-white p-8 shadow-2xl">
+            <div className="flex flex-col gap-6">
+              <header>
+                <p className="text-xs font-semibold uppercase tracking-wider text-brand-blue">Approval Snapshot</p>
+                <h2 className="mt-2 text-2xl font-bold text-brand-black">Stay on top of every submission</h2>
+                <p className="mt-2 text-sm text-brand-black/70">
+                  Track drafts, approvals, and returns at a glance. Agency fees and GST are auto-calculated so your numbers stay consistent.
+                </p>
+              </header>
+              <div className="space-y-4">
+                <div className="rounded-2xl bg-blue-50 p-4 text-sm text-brand-black">
+                  <div className="flex items-center justify-between">
+                    <p className="font-semibold">Rooftop Gala Launch</p>
+                    <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-blue">Pending Rehan</span>
+                  </div>
+                  <p className="mt-2 text-xs text-brand-black/60">Agency Fee: 12% • GST (19%): ₹1,54,520</p>
+                </div>
+                <div className="rounded-2xl bg-brand-black p-4 text-sm text-white">
+                  <div className="flex items-center justify-between">
+                    <p className="font-semibold">Sangeet Night Production</p>
+                    <span className="rounded-full bg-brand-blue px-3 py-1 text-xs font-bold text-white">Approved</span>
+                  </div>
+                  <p className="mt-2 text-xs text-white/80">Total Budget: ₹12,40,000</p>
+                </div>
+              </div>
+              <footer className="rounded-2xl border border-dashed border-blue-200 bg-blue-50/50 p-4 text-xs text-brand-black/70">
+                Vendor additions require an OTP confirmation sent to <span className="font-semibold text-brand-blue">rehan@voiceworx.in</span> before rate cards can be edited.
+              </footer>
+            </div>
+          </div>
+        </div>
+      </section>
+    </main>
+  );
+}
