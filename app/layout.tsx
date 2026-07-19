import type { Metadata } from "next";
import { IBM_Plex_Serif } from "next/font/google";
import Cursor from "@/components/layout/Cursor";
import "./globals.css";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aastha Singh — Product & UX Designer",
  description:
    "Designing, tinkering, drinking coffee. Product and UX design portfolio of Aastha Singh, Delhi, India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={ibmPlexSerif.variable}>
      <body className="paper-grid min-h-screen antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
