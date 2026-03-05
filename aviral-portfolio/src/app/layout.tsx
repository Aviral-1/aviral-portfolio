import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aviral Mishra | Frontend Developer & Dashboard Architect",
  description:
    "Frontend Developer with 2+ years of experience building high-performance dashboards, smart-city systems, GIS applications, and IoT analytics panels. React.js, Next.js, Tailwind CSS.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
