import type { Metadata } from "next";
import { IBM_Plex_Serif, Homemade_Apple } from "next/font/google";
import Cursor from "@/components/layout/Cursor";
import "./globals.css";

const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-serif",
  display: "swap",
});

// Section headings, the postcard line and project years use Homemade Apple.
// Free on Google Fonts, so no licensing step required.
const homemadeApple = Homemade_Apple({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-homemade-apple",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aastha Singh — Product & UX Designer",
  description:
    "Designing, tinkering, drinking coffee. Product and UX design portfolio of Aastha Singh, Delhi, India.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${ibmPlexSerif.variable} ${homemadeApple.variable}`}>
      <body className="min-h-screen bg-[#f5f5f5] antialiased">
        <Cursor />
        {children}
      </body>
    </html>
  );
}
