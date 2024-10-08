"use client"

import { useState } from "react";
import { Slider } from "@radix-ui/themes";
import Image from "next/image";
import Link from "next/link";

interface VolumePageProps {
    maxValue: number; // Maximum value passed from the Create Order page
}

export default function VolumePage({ maxValue = 10000 }: VolumePageProps) {
    const [range, setRange] = useState<[number, number]>([0, maxValue]); // Set default range

    // Handler for slider changes
    const handleSliderChange = (newValue: [number, number]) => {
        setRange(newValue); // Update the range when the slider is changed
    };

    return (
        <div className="bg-black rounded-md py-2 px-4 font-medium text-white u-class-shadow">
            {/* Back link to Create Order */}
            <Link href="/create-order" className="flex items-center gap-1 cursor-pointer">
                <div className="flex items-center">
                    <div className="rounded-full w-5 h-5 border-white border-2 flex items-center justify-center">
                        <Image
                            src="/chevronDown.svg"
                            alt="chevron"
                            width={10}
                            height={10}
                            priority
                            quality={100}
                            className="rotate-90"
                        />
                    </div>
                </div>
                <p className="text-lg">Back</p>
            </Link>

            <div className="mt-[6px]">
                <p className="text-lg">Customize order Volume per User</p>
            </div>

            <div className="mt-5">
                <p className="text-[14.6px]">Borrow Allocation</p>

                {/* Range Slider */}
                <div className="mt-2 w-full max-w-[428px] bg-[#FFCFB4] rounded-lg p-2">
                    <Slider
                        defaultValue={range} // Set default slider range
                        value={range} // Controlled component: reflect the state
                        onValueChange={handleSliderChange} // Update range on slider change
                        max={maxValue || 10000} // Max value comes from Create Order page, default to 10000
                        min={0} // Minimum is 0
                        step={1} // Adjust step size for finer control
                        className="w-full"
                    />
                </div>

                <div className="text-base mt-6 flex justify-between items-center">
                    {/* Lower Limit */}
                    <div className="w-[121px]">
                        <div className="border border-white w-full py-3 rounded-lg">
                            <p className="pl-4">${range[0]?.toFixed(2) ?? "0.00"}</p> {/* Lower Limit */}
                        </div>
                        <p className="text-[10px] font-medium text-center mt-1">Lower Limit</p>
                    </div>

                    <div className="text-2xl">-</div>

                    {/* Upper Limit */}
                    <div className="w-[121px]">
                        <div className="border border-white w-full py-3 rounded-lg">
                            <p className="pl-4">
                                ${range[1] !== undefined ? range[1].toFixed(2) : (maxValue !== undefined ? maxValue.toFixed(2) : "0.00")}
                            </p> {/* Safely handle undefined range[1] or maxValue */}
                        </div>
                        <p className="text-[10px] font-medium text-center mt-1">Upper Limit</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
