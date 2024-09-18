import { Header } from "@/components/shared/Header";

export default function OtherScreensLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="relative top-16 mx-auto w-11/12">
           <Header /> 
            <main className="mt-10 max-w-6xl mx-auto">
                {children}
            </main>
        </section>
    );
}
