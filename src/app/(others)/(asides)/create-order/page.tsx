"use client";

import { DateInputField } from "@/components/createOrder/DateInputField";
import { Btn } from "@/components/shared/Btn";
import AssetSelector from "@/components/shared/AssetSelector";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function CreateOrderPage() {
    const [percentage, setPercentage] = useState(0);
    const [selectedToken, setSelectedToken] = useState("ETH");
    const [fiatAmount, setFiatAmount] = useState(0); // Fiat amount based on token price
    const [tokenPrice, setTokenPrice] = useState(2500); // Initial price of the selected token
    const [assetValue, setAssetValue] = useState("0.00"); // Asset value

    // Increment and decrement functions
    const handleIncrement = () => {
        if (percentage < 100) setPercentage(percentage + 1);
    };

    const handleDecrement = () => {
        if (percentage > 0) setPercentage(percentage - 1);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        const regex = /^\d*\.?\d{0,3}$/;

        if (regex.test(value)) {
            const numericValue = parseFloat(value);
            if (!isNaN(numericValue) && numericValue >= 0 && numericValue <= 100) {
                setPercentage(numericValue);
            }
        }
    };

    // Handle token selection and update fiat amount based on token price
    const handleTokenSelect = (token: string, price: number) => {
        setSelectedToken(token);
        setTokenPrice(price);
        setFiatAmount(parseFloat(assetValue) * price); // Update fiat amount when a token is selected
    };

    // Handle asset value change from AssetSelector
    const handleAssetValueChange = (value: string) => {
        setAssetValue(value);
        setFiatAmount(parseFloat(value) * tokenPrice); // Recalculate fiat amount based on new asset value
    };

    return (
        <div className="bg-black rounded-md p-2 u-class-shadow">
            <p className="text-base text-white pl-2">Order</p>

            <div className="my-4 px-14">
                <div className="flex gap-6 items-center w-80 justify-center">
                    <Btn
                        text={"Lend"}
                        css="text-black/80 bg-[#D7D7D7CC]/80 text-xl w-full py-2 rounded flex items-center justify-center"
                    />
                    <Btn
                        text={"Borrow"}
                        css="text-black bg-[#FF4D00CC]/80 text-xl w-full py-2 rounded flex items-center justify-center"
                    />
                </div>
            </div>

            {/* Use AssetSelector component */}
            <AssetSelector
                onTokenSelect={handleTokenSelect}
                onAssetValueChange={handleAssetValueChange}
                assetValue={assetValue}
            />

            <div className="px-4">
                <div className="bg-white mt-3 rounded-[40px] px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div className="text-[14.6px] font-medium">
                            <p className="text-[#636363]">
                                Order Value
                                <span className="text-black/30 ml-3">
                                    .<span className="ml-2">Net Profit</span>
                                </span>
                            </p>
                        </div>

                        <div className="flex items-center gap-2">
                            <p className="text-black text-[14.6px]">{selectedToken}</p> {/* Use selectedToken */}
                            <Image
                                src={"/chevron.svg"}
                                alt="token"
                                width={6}
                                height={11}
                                priority
                                quality={100}
                                className=""
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        {/* Fiat amount calculation */}
                        <p className="font-bold text-black text-[51.12px]">
                            ${fiatAmount.toFixed(2)} {/* Calculated fiat amount */}
                            <span className="text-[14.6px] ml-2 font-medium text-black/30">
                                +${(fiatAmount * (percentage / 100)).toFixed(2)} {/* Calculated interest */}
                            </span>
                        </p>
                    </div>

                    <div className="flex items-center w-full gap-1 justify-center mt-2">
                        <button
                            onClick={handleDecrement}
                            className="bg-[#A2A8B4] rounded-full py-4 px-[25px] flex items-center justify-center"
                        >
                            <p className="text-4xl">-</p>
                        </button>

                        <div className="relative">
                            <input
                                type="number"
                                value={percentage}
                                onChange={handleInputChange}
                                className="bg-[#FF4D00CC]/80 rounded-3xl p-4 text-[27.5px] font-medium text-black w-[150px] text-center"
                                min={0}
                                max={100}
                                step={0.001}
                                placeholder="0.00"
                            />
                            <span className="absolute right-3.5 top-4 text-[27.5px] font-medium text-black">%</span>
                        </div>

                        <button
                            onClick={handleIncrement}
                            className="bg-[#A2A8B4] rounded-full py-4 px-[25px] flex items-center justify-center"
                        >
                            <p className="text-4xl">+</p>
                        </button>
                    </div>

                </div>
            </div>

            <div className="px-4">
                <DateInputField />
            </div>

            <Link href={"/volume"} className="my-4 px-4 cursor-pointer">
                <Btn
                    text={"Create Order"}
                    css="text-black bg-[#FF4D00CC]/80 text-base w-full py-2 rounded flex items-center justify-center"
                />
            </Link>
        </div>
    );
}
