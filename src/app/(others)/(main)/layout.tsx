import { Header } from "@/components/shared/Header";

export default function OtherScreensLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <section className="relative top-16 mx-auto w-11/12">
           <Header /> 
            <main>
                {children}
            </main>
        </section>
    );
}
