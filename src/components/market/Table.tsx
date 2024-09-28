"use client"
import { useState } from "react";
import Image from "next/image";
import { Btn } from "../shared/Btn";

const Table = () => {
   
    const [activeTable, setActiveTable] = useState<"borrow" | "lend">("borrow");

    
    const handleTableChange = (table: "borrow" | "lend") => {
        setActiveTable(table);
    };


    return (
        <div className="w-full">
            <div className="px-12 flex justify-between items-center mb-6">
                <div className="text-xl space-x-6">
                    <button
                        className={`py-2 px-8 rounded-lg bg-black ${activeTable === "borrow" ? "border border-[#FF4D00]" : ""}`}
                        onClick={() => handleTableChange("borrow")}
                    >
                        Borrow
                    </button>
                    <button
                        className={`py-2 px-12 rounded-lg bg-black ${activeTable === "lend" ? "border border-[#FF4D00]" : ""}`}
                        onClick={() => handleTableChange("lend")}
                    >
                        Lend
                    </button>
                </div>
                <div className="flex justify-end gap-4">
                    <div className="py-2 px-4 bg-black rounded-lg gap-6 flex items-center text-lg">
                        <div>All Tokens</div>
                        <div>
                            <Image src={"/chevronDown.svg"} alt="token" width={15} height={15} priority quality={100} />
                        </div>
                    </div>
                    <div className="p-2 bg-black rounded-lg">
                        <Image src={"/filter.svg"} alt="token" width={32} height={32} priority quality={100} />
                    </div>
                </div>
            </div>

            {activeTable === "borrow" && (
                <>
                    {tableData.map((data, index) => (
                        <div key={index} className="w-full bg-black rounded-lg p-6 flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Image src={data.icon} alt={data.token} width={37} height={36} priority quality={100} />
                                <p className="text-[15px]">{data.token}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Image src={"/avatar.svg"} alt="avatar" width={17} height={16} priority quality={100} />
                                <p className="text-sm">{data.address}</p>
                            </div>

                            <div className="text-base">{data.amount}</div>
                            <div className="text-base">{data.interest}</div>
                            <div className="text-base">{data.duration}</div>

                            <div>
                                <Btn text={"Borrow"} css="text-black bg-[#FF4D00] text-base px-3 rounded-md" />
                            </div>
                        </div>
                    ))}
                </>
            )}

            {activeTable === "lend" && (
                <>
                    {tableData.map((data, index) => (
                        <div key={index} className="w-full bg-black rounded-lg p-6 flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Image src={data.icon} alt={data.token} width={37} height={36} priority quality={100} />
                                <p className="text-[15px]">{data.token}</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <Image src={"/avatar.svg"} alt="avatar" width={17} height={16} priority quality={100} />
                                <p className="text-sm">{data.address}</p>
                            </div>

                            <div className="text-base">{data.amount}</div>
                            <div className="text-base">{data.interest}</div>
                            <div className="text-base">{data.duration}</div>

                            <div>
                                <Btn text={"Lend"} css="text-black bg-[#FF4D00] text-base rounded-md px-6" />
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

export default Table;

const tableData = [
        {
            token: "USDC",
            address: "0xabc.....asfd83",
            amount: "9,999 USD",
            interest: "12.5%",
            duration: "31 days",
            icon: "/USDC.svg",
        },
        {
            token: "DAI",
            address: "0xdef.....qwerty7",
            amount: "7,500 USD",
            interest: "10%",
            duration: "60 days",
            icon: "/dai.svg",
        },
        {
            token: "ETH",
            address: "0xghi.....xyz123",
            amount: "2.5 ETH",
            interest: "8%",
            duration: "45 days",
            icon: "/eth.svg",
        },
        {
            token: "LINK",
            address: "0xjkl.....mno456",
            amount: "90 USD",
            interest: "4%",
            duration: "109 days",
            icon: "/link.svg",
        },
    ];