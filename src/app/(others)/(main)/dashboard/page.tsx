

export default function DashboardPage() {
    return (
        <main className="w-full">
            {Array.from({ length: 30}, (_, i) => (
                <ul key={i}>
                <li className="">
                    DASHBOARD
                </li>
                </ul>
                
            ))}
        </main>
    )
}