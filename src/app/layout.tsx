import "@/styles/globals.css";
import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import { WizardProvider } from "@/context/WizardContext";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
});

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
    <html lang="ko" className={spaceMono.variable}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body className="min-h-screen font-sans text-text">
        <WizardProvider>{children}</WizardProvider>
      </body>
    </html>
  );
}
