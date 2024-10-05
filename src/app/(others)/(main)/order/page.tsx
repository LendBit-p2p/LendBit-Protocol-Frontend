import OhNo from "@/components/order/OhNo";
import OrdersDetails from "@/components/order/OrdersDetails";
import PendingRepayments from "@/components/order/PendingRepayments";
import TransactionHistory from "@/components/order/TransactionHistory";
import { orderSample } from "@/constants/utils/orderSample";


export default function OrderPage() {
    return (
        <main className="max-w-[1370px] mx-auto mt-10">
            <div className="w-full px-1">
                {orderSample.length > 0 ? (
                    <div>
                        <div className="mb-6">
                            <OrdersDetails orderSample={orderSample} />  
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
                ):
                    (
                        <OhNo />
                    )
                }
                
                
            </div>
        </main>
    )
}