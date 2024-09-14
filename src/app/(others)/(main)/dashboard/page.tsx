

export default function DashboardPage() {
    return (
        <main className="w-full">
            {Array.from({ length: 500 }, (_, i) => (
                <ul key={i}>
                <li className="flex flex-col gap-12">
                    DASHBOARD
                </li>
                </ul>
                
            ))}
        </main>
    )
}