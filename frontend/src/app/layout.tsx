import type { Metadata } from "next";
import { Inter, DM_Mono, DM_Sans, Bebas_Neue } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmMono = DM_Mono({ weight: ["400", "500"], subsets: ["latin"], variable: "--font-dm-mono" });
const dmSans = DM_Sans({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-dm-sans" });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });

export const metadata: Metadata = {
  title: "Cresvia — AI-Powered Career Platform",
  description: "From resume creation to job match confidence scoring and interview preparation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${dmMono.variable} ${dmSans.variable} ${bebasNeue.variable}`}>
        {children}
      </body>
    </html>
  );
}