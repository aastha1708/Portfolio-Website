import type { Metadata } from "next";
import { IBM_Plex_Serif, Homemade_Apple, DM_Sans } from "next/font/google";
import Cursor from "@/components/layout/Cursor";
import "./globals.css";

// The interface voice (Aug 2026, replacing Neue Montreal). Variable font, so
// the four weights the design uses cost one file.
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

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

export default function RootLayout({
  children,
  sheet,
}: {
  children: React.ReactNode;
  /** Parallel slot for intercepted /work routes — the case-study bottom
   *  sheet renders here, over the still-mounted page (see app/@sheet). */
  sheet: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${ibmPlexSerif.variable} ${homemadeApple.variable}`}>
      <body className="min-h-screen bg-paper antialiased">
        <Cursor />
        {children}
        {sheet}
      </body>
    </html>
  );
}
