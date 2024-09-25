import { Header } from "@/components/shared/Header";

export default function OtherScreensLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="relative top-16 mx-auto w-[91%] text-white">
           <Header /> 
            <main className="mt-6 pb-4">
                {children}
            </main>
        </section>
    );
}
