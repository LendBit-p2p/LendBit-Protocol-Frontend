import type { Metadata } from "next";
import localFont from "next/font/local";
import { Zen_Dots, Outfit, Inter, Montserrat } from 'next/font/google';
import "./globals.css";
import { RadixTheme } from "@/config/radix";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Lendbit",
  description: "Lendbit, Your gateway to seamless crypto lending & borrowing. Secure, transparent, and flexible. Unlock the full potential of your digital assets.",
  icons: "./favicon.ico"
};
const zenDots = Zen_Dots({
  weight: '400',  
  subsets: ['latin'],  
});

const montserrat = Montserrat({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "800"],
  subsets: ["latin"],
  variable: "--font-montserrat",
})


const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "800"],
  subsets: ["latin"],
  variable: "--font-inter",
})


const outfit = Outfit({
  weight: ["400","500", "600"],  
  subsets: ['latin'],
  variable: "--font-outfit",

});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-hidden">
        <RadixTheme>
          <div
            className={`${zenDots.className}  ${outfit.variable} ${geistSans.variable} ${geistMono.variable} ${inter.variable} ${montserrat.variable} antialiased`}
          >
            {children}
          </div>
        </RadixTheme>
      </body>
    </html>
  );
}
