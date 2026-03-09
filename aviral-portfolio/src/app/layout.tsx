import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aviral Mishra | Frontend Developer & Dashboard Architect",
  description:
    "Frontend Developer with 3+ years of experience building high-performance dashboards, smart-city systems, GIS applications, and IoT analytics panels. React.js, Next.js, Tailwind CSS.",
  keywords: [
    "Aviral Mishra",
    "Frontend Developer",
    "React Developer",
    "Dashboard Developer",
    "Smart City",
    "GIS",
    "Next.js",
    "Greater Noida",
  ],
  openGraph: {
    title: "Aviral Mishra | Frontend Developer",
    description:
      "Frontend Developer specializing in React.js dashboards, GIS-based apps, and IoT analytics panels.",
    url: "https://aviral-mishra.dev",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${space.variable} ${jetbrains.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
