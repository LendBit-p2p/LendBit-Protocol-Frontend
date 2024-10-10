"use client"

import OhNo from "@/components/order/OhNo";
import OrdersDetails from "@/components/order/OrdersDetails";
import PendingRepayments from "@/components/order/PendingRepayments";
import TransactionHistory from "@/components/order/TransactionHistory";
import PleaseConnect from "@/components/shared/PleaseConnect";
import { orderSample } from "@/constants/utils/orderSample";
import { Spinner } from "@radix-ui/themes";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useEffect, useState } from "react";

export default function OrderPage() {

    const { address, isConnected} = useWeb3ModalAccount();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) {
        return (
            <div className='text-[#FF4D00] flex justify-center my-64'>
                <Spinner size={"3"} />
            </div>
        )    
    }

    if (!isConnected && !address) {
        return <PleaseConnect />;
    }

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
