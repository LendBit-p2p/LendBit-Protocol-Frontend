import BackgroundAnimation from "@/components/animations/background";


export default function OtherScreensLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="w-full relative z-0">
            <BackgroundAnimation />
            
            <main className="w-full h-screen overflow-y-auto absolute left-0 top-0 z-10">
                {children}
            </main>
        </section>
    );
}
