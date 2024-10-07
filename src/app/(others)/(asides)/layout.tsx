
export default function AsidesScreensLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <aside className="flex justify-center items-center w-full h-screen z-20">    
            {children}
        </aside>
    );
}