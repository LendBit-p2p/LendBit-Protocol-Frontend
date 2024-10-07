import OhNo from "@/components/order/OhNo";
import OrdersDetails from "@/components/order/OrdersDetails";
import PendingRepayments from "@/components/order/PendingRepayments";
import TransactionHistory from "@/components/order/TransactionHistory";
import { orderSample } from "@/constants/utils/orderSample";

export default function OrderPage() {
    return (
        <main className="max-w-[1370px] mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                {/* OrdersDetails - Full width, no fixed height */}
                {orderSample.length > 0 ? (
                <div>
                    <div className="mb-6">
                        <OrdersDetails
                            orderSample ={orderSample} 
                        />
                    </div>

                    {/* Stack PendingRepayments and TransactionHistory vertically on small screens */}
                    <div className="flex flex-col md:flex-row justify-between w-full gap-6">
                        {/* Pending Repayments Section */}
                        <div className="w-full md:w-5/12  p-4 rounded-lg">
                            <PendingRepayments />
                        </div>

                        {/* Transaction History Section */}
                        <div className="w-full md:w-7/12  p-4 rounded-lg">
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
    );
}
