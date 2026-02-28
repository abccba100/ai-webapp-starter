import "@/styles/globals.css";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { WizardProvider } from "@/context/WizardContext";

const outfit = Outfit({ subsets: ["latin"], variable: "--ds-font-display" });

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
    <html lang="ko" className={outfit.variable}>
      <body className="min-h-screen bg-white text-neutral-900">
        <WizardProvider>{children}</WizardProvider>
      </body>
    </html>
  );
}
