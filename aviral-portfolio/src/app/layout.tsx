import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aviral Mishra | Portfolio",
  description: "Built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-body">{children}</body>
    </html>
  );
}
