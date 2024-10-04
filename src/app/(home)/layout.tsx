import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Lendbit",
    description: "Lendbit, Your gateway to seamless peer-to-peer crypto lending & borrowing. Secure, transparent, and flexible. Unlock the full potential of your digital assets.",
    icons: "./favicon.ico",
    openGraph: {
        title: "Lendbit",
        description: "Lendbit, Your gateway to seamless peer-to-peer crypto lending & borrowing. Secure, transparent, and flexible. Unlock the full potential of your digital assets.",
        images: `/public/lendbit-oranglogo-horizontal.png`, 
    },
    other: {},
};

export default function HomeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <main className="w-full h-screen overflow-y-auto bg-[#0f0f0f]">
            {children}
        </main>
    );
}