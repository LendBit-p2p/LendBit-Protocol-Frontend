import type { Metadata } from "next";
import localFont from "next/font/local";
import { Share_Tech_Mono, Outfit} from 'next/font/google';
import "./globals.css";
import { RadixTheme } from "@/config/radix";
import Background from "@/components/shared/background/background";

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
  weight: '400',  
  subsets: ['latin'], 
});

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
      <body
        className={`overflow-hidden`}
      >
        <RadixTheme>
           <div
            className={`${shareTechMono.className}  ${outfit.variable} antialiased`}
          >
            <section className="w-full relative px-4 py-2 bg-black"
            >
              <Background />
                
              <main className="w-full h-screen overflow-y-auto absolute left-0 top-0 z-10">
                {children}
              </main>
            </section>
          </div>
        </RadixTheme>   
      </body>
    </html>
  );
}
