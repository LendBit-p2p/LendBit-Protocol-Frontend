import type { Metadata } from "next";
import localFont from "next/font/local";
import { Share_Tech_Mono} from 'next/font/google';
import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "Lendbit | P2P Lending",
  description: "Lendbit, Your gateway to seamless peer-to-peer crypto lending & borrowing. Secure, transparent, and flexible. Unlock the full potential of your digital assets.",
  icons: "./favicon.ico"
};
const shareTechMono = Share_Tech_Mono({
  weight: '400',  // Zen Dots has only 400 weight
  subsets: ['latin'],  // Add other subsets if needed
});

// const outfit = Outfit({
//   weight: ["400","500", "600"],  
//   subsets: ['latin'],
//   variable: "--font-outfit",

// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${shareTechMono.className} antialiased overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
