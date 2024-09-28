import OrdersDetails from "@/components/order/OrdersDetails";
import PendingRepayments from "@/components/order/PendingRepayments";
import TransactionHistory from "@/components/order/TransactionHistory";


export default function OrderPage() {
    return (
        <main className="max-w-[1370px] mx-auto mt-10">
            <div className="w-full px-1">
                <div className="mb-6">
                    <OrdersDetails />  
                </div>

                
                <div className="flex justify-between w-full gap-10">
                    <div className="w-5/12">
                        <PendingRepayments />
                    </div>
                    <div className="w-7/12">
                        <TransactionHistory />
                    </div>
                </div>   
                
            </div>
        </main>
    )
}