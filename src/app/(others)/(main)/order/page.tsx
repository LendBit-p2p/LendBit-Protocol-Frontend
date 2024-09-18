

export default function OrderPage() {
    return (
        <main className="w-full flex gap-12">
            {Array.from({ length: 5}, (_, i) => (
                <ul key={i}>
                <li>
                    Order
                </li>
                </ul>
                
            ))}
        </main>
    )
}