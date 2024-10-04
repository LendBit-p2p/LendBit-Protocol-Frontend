import OrdersDetails from "@/components/order/OrdersDetails";
import PendingRepayments from "@/components/order/PendingRepayments";
import TransactionHistory from "@/components/order/TransactionHistory";

export default function OrderPage() {
    return (
        <main className="max-w-[1370px] mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <div className="w-full">
                {/* OrdersDetails - Full width, no fixed height */}
                <div className="mb-6">
                    <OrdersDetails />
                </div>

                {/* Stack PendingRepayments and TransactionHistory vertically on small screens */}
                <div className="flex flex-col md:flex-row justify-between w-full gap-6">
                    {/* Pending Repayments Section */}
                    <div className="w-full md:w-5/12  p-4 rounded-lg shadow-md">
                        <PendingRepayments />
                    </div>

                    {/* Transaction History Section */}
                    <div className="w-full md:w-7/12  p-4 rounded-lg shadow-md">
                        <TransactionHistory />
                    </div>
                </div>
            </div>
        </main>
    );
}
