diff --git a/frontend/src/app/(auth)/login/page.tsx b/frontend/src/app/(auth)/login/page.tsx
new file mode 100644
index 0000000000000000000000000000000000000000..3a2ed1e00a3b0465e9dd717f2e8c22dda2250434
--- /dev/null
+++ b/frontend/src/app/(auth)/login/page.tsx
@@ -0,0 +1,62 @@
+import Link from "next/link";
+
+export default function LoginPage() {
+  return (
+    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-brand-white via-white to-blue-100 px-6 py-12">
+      <div className="grid w-full max-w-5xl gap-10 lg:grid-cols-2">
+        <section className="flex flex-col justify-center gap-4 rounded-3xl bg-brand-black p-10 text-white shadow-2xl">
+          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">V-Budget Access</p>
+          <h1 className="text-3xl font-bold">Welcome back!</h1>
+          <p className="text-sm text-white/70">
+            Sign in using your Voiceworx email address. New employees will trigger an OTP request to <span className="font-semibold text-brand-blue">rehan@voiceworx.in</span> for activation.
+          </p>
+          <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-xs text-white/80">
+            Vendor additions remain OTP-gated even after login, ensuring rate cards stay accurate and approved.
+          </div>
+          <Link href="/" className="text-xs font-semibold text-brand-blue hover:underline">
+            ← Back to overview
+          </Link>
+        </section>
+
+        <form className="flex flex-col gap-6 rounded-3xl border border-blue-100 bg-white p-10 shadow-xl">
+          <header className="space-y-1">
+            <h2 className="text-2xl font-semibold text-brand-black">Employee Login</h2>
+            <p className="text-sm text-brand-black/70">Use your Voiceworx email ID and password or request a secure OTP.</p>
+          </header>
+          <div className="space-y-5">
+            <label className="block space-y-2 text-sm font-medium text-brand-black/80">
+              Email address
+              <input
+                type="email"
+                placeholder="you@voiceworx.in"
+                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm text-brand-black outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40"
+              />
+            </label>
+            <label className="block space-y-2 text-sm font-medium text-brand-black/80">
+              Password
+              <input
+                type="password"
+                placeholder="••••••••"
+                className="w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm text-brand-black outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/40"
+              />
+            </label>
+          </div>
+          <button
+            type="submit"
+            className="rounded-full bg-brand-blue px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-blue-800"
+          >
+            Sign in
+          </button>
+          <div className="space-y-3 text-sm">
+            <button type="button" className="w-full rounded-full border border-brand-blue px-6 py-3 font-semibold text-brand-blue transition hover:bg-brand-blue/5">
+              Request OTP instead
+            </button>
+            <p className="text-xs text-brand-black/60">
+              New here? <span className="font-semibold text-brand-blue">Request access</span> and Rehan will approve your account via OTP.
+            </p>
+          </div>
+        </form>
+      </div>
+    </main>
+  );
+}
