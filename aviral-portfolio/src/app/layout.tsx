import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aviral Mishra | Premium Portfolio",
  description: "Full-stack engineer portfolio showcasing projects, skills, and contact.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
