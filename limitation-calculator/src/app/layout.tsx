import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Limitation Calculator - Post-Judgment Legal Options (India)",
  description:
    "Calculate limitation periods and explore legal options after a court judgment in India. Appeals, Review, SLP, Execution timelines.",
  keywords: [
    "limitation period",
    "appeal deadline",
    "SLP",
    "review petition",
    "Indian law",
    "court judgment",
    "legal timeline",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
