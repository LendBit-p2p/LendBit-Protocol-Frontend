import MktHeader from "@/components/market/MktHeader";
import Table from "@/components/market/Table";

export default function MarketPlacePage() {
    return (
        <main className="max-w-[1370px] mx-auto mt-10">
            <div className="w-full px-1">
                <div className="mb-8">
                    <MktHeader />
                </div>

                <div>
                    <Table />
               </div>
            </div>
        </main>
    )
}