import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "V-Budget | Event Budgeting Made Easy",
  description: "Plan, approve, and share event budgets effortlessly with Voiceworx's V-Budget platform."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-brand-white text-brand-black min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
