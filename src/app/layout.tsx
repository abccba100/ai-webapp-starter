// src/app/layout.tsx
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WizardProvider } from "@/context/WizardContext";
import Header from "@/components/Header";
import Stepper from "@/components/Stepper";
import SidebarSteps from "@/components/SidebarSteps";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "AI Web App Builder",
  description: "Generate your web app MVP in minutes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body
        className={`${inter.className} bg-background text-secondary min-h-screen flex flex-col`}
      >
        <WizardProvider>
          <Header />
          <Stepper />
          <main className="flex-1 w-full max-w-5xl mx-auto p-4 md:p-8 flex flex-col md:flex-row gap-6">
            <SidebarSteps />
            <section className="flex-1">
              <div className="card card-spacing">
                {children}
              </div>
            </section>
          </main>
          <footer className="py-6 text-center text-slate-400 text-sm">
            © 2024 AI App Builder. All rights reserved.
          </footer>
        </WizardProvider>
      </body>
    </html>
  );
}
