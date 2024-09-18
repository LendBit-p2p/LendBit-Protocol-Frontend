import Background from "@/components/shared/background/background";


export default function OtherScreensLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="w-full relative px-4 py-2 bg-black">
            <Background />
            
            <main className="w-full h-screen overflow-y-auto absolute left-0 top-0 z-10">
                {children}
            </main>
        </section>
    );
}
