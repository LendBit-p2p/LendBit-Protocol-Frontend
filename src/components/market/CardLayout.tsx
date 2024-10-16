"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Btn } from "../shared/Btn";
import useGetAllListings from "@/hooks/useGetAllListings";
import { formatAddress } from "@/constants/utils/formatAddress";
import useGetAllRequests from "@/hooks/useGetAllRequests";
import { Spinner } from "@radix-ui/themes";
import useServiceRequest from "@/hooks/useServiceRequest";
import { useRouter } from "next/navigation";
import useGetValueAndHealth from "@/hooks/useGetValueAndHealth";

const tokenImageMap: { [key: string]: { image: string; label: string } } = {
    "0xE4aB69C077896252FAFBD49EFD26B5D171A32410": { image: "/link.svg", label: "LINK" },
    "0x0000000000000000000000000000000000000001": { image: "/eth.svg", label: "ETH" },
};

const CardLayout = () => {
    const [activeTable, setActiveTable] = useState<"borrow" | "lend">("borrow");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedToken, setSelectedToken] = useState<string>("All Tokens");
    const [borrowTableData, setBorrowTableData] = useState<any[]>([]);
    const [lendTableData, setLendTableData] = useState<any[]>([]);
    const [filteredBorrowData, setFilteredBorrowData] = useState<any[]>([]);
    const [filteredLendData, setFilteredLendData] = useState<any[]>([]);
    const [loadingBorrow, setLoadingBorrow] = useState(true);
    const [loadingLend, setLoadingLend] = useState(true);
    const router = useRouter();

    const { collateralVal, etherPrice, linkPrice } = useGetValueAndHealth();

    // Fetch all listings and requests
    const { loadings: borrowLoading, listingData } = useGetAllListings();
    const { loading: lendLoading, requestData } = useGetAllRequests();
    const service = useServiceRequest();

    useEffect(() => {
        if (listingData) {
            setBorrowTableData(listingData);
            setLoadingBorrow(borrowLoading);
        }
    }, [listingData]);

    useEffect(() => {
        if (requestData) {
            setLendTableData(requestData);
            setLoadingLend(lendLoading);
        }
    }, [requestData]);

    // Filter borrow data based on selected token
    useEffect(() => {
        setFilteredBorrowData(
            selectedToken === "All Tokens"
                ? borrowTableData
                : borrowTableData.filter(data => data.tokenAddress === selectedToken)
        );
    }, [selectedToken, borrowTableData]);

    // Filter lend data based on selected token
    useEffect(() => {
        setFilteredLendData(
            selectedToken === "All Tokens"
                ? lendTableData
                : lendTableData.filter(data => data.loanRequestAddr === selectedToken)
        );
    }, [selectedToken, lendTableData]);

    const handleTableChange = (table: "borrow" | "lend") => {
        setActiveTable(table);
    };

    const handleToggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleTokenSelect = (token: string) => {
        setSelectedToken(token);
        setIsDropdownOpen(false);
    };

    const handleBorrowAllocation = (data: any) => {
        const queryString = `?listingId=${data.listingId}&maxAmount=${data.max_amount}&minAmount=${data.min_amount}`;
        router.push(`/borrow-allocation${queryString}`);
    };

    return (
        <div className="w-full">
            {/* Toggle Borrow/Lend */}
            <div className="px-4 sm:px-12 flex flex-col sm:flex-row justify-between items-center mb-6">
                <div className="text-xl space-x-4 sm:space-x-6">
                    <button
                        className={`py-2 px-4 sm:px-8 rounded-lg bg-black u-class-shadow-4 ${activeTable === "borrow" ? "border border-[#FF4D00]" : ""}`}
                        onClick={() => handleTableChange("borrow")}
                    >
                        Borrow
                    </button>
                    <button
                        className={`py-2 px-4 sm:px-12 rounded-lg bg-black u-class-shadow-4 ${activeTable === "lend" ? "border border-[#FF4D00]" : ""}`}
                        onClick={() => handleTableChange("lend")}
                    >
                        Lend
                    </button>
                </div>

                {/* Token Dropdown and Filter */}
                <div className="relative flex justify-end gap-4 mt-4 sm:mt-0">
                    <div
                        className="py-2 px-4 bg-black rounded-lg flex items-center text-lg cursor-pointer u-class-shadow-4"
                        onClick={handleToggleDropdown}
                    >
                        {selectedToken !== "All Tokens" && (
                            <Image
                                src={tokenImageMap[selectedToken]?.image}
                                alt={selectedToken}
                                width={30}
                                height={30}
                            />
                        )}
                        <div className="pl-2">{tokenImageMap[selectedToken]?.label || "All Tokens"}</div>
                        <div className="pl-4">
                            <Image
                                src={"/chevronDown.svg"}
                                alt="dropdown indicator"
                                width={15}
                                height={15}
                                priority
                                quality={100}
                            />
                        </div>
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute top-full mt-2 w-48 bg-black rounded-lg p-4 z-10">
                            <div
                                className="cursor-pointer hover:bg-gray-800 p-2"
                                onClick={() => handleTokenSelect("All Tokens")}
                            >
                                All Tokens
                            </div>
                            {Object.keys(tokenImageMap).map((tokenAddress, index) => (
                                <div
                                    key={index}
                                    className="cursor-pointer hover:bg-gray-800 p-2 flex items-center gap-4"
                                    onClick={() => handleTokenSelect(tokenAddress)}
                                >
                                    <Image src={tokenImageMap[tokenAddress].image} alt={tokenAddress} width={30} height={30} />
                                    <p>{tokenImageMap[tokenAddress].label}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="px-4 sm:px-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTable === "borrow" ? (
                    loadingBorrow ? (
                        <div className="flex items-center justify-center h-32 gap-3 col-span-full">
                            <Spinner size={"3"} />
                            <p className="text-white mt-2 text-2xl">Fetching Borrow Data...</p>
                        </div>
                    ) : filteredBorrowData.slice().reverse().map((data, index) => (
                        <div key={index} className="bg-black rounded-lg p-4 shadow-lg u-class-shadow-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Image src={tokenImageMap[data.tokenAddress]?.image} alt={data.loanRequestAddr} width={37} height={36} priority quality={100} />
                                <h2 className="text-lg font-semibold">{tokenImageMap[data.tokenAddress]?.label}</h2>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <Image src="/avatar.svg" alt="avatar" width={24} height={24} />
                                <p className="text-gray-400">Origin:</p>
                                <p className="font-semibold">{formatAddress(data.author)}</p>
                            </div>
                            <p className="text-gray-400">Volume:</p>
                            <p className="mb-2">
                                {Number(data.amount)} {tokenImageMap[data.tokenAddress]?.label} (~$
                                {(
                                    Number(data.amount) *
                                    (tokenImageMap[data.tokenAddress]?.label === "ETH" ? Number(etherPrice) : Number(linkPrice))
                                ).toFixed(2)})
                            </p>
                            <p className="text-gray-400">Rate:</p>
                            <p className="mb-2">{data.interest}%</p>
                            <p className="text-gray-400">Min:</p>
                            <p className="mb-2">
                                {Number(data.min_amount).toFixed(3)} (~$
                                {(
                                    Number(data.min_amount) *
                                    (tokenImageMap[data.tokenAddress]?.label === "ETH" ? Number(etherPrice) : Number(linkPrice))
                                ).toFixed(2)})
                            </p>
                            <p className="text-gray-400">Max:</p>
                            <p className="mb-2">
                                {Number(data.max_amount).toFixed(3)} (~$
                                {(
                                    Number(data.max_amount) *
                                    (tokenImageMap[data.tokenAddress]?.label === "ETH" ? Number(etherPrice) : Number(linkPrice))
                                ).toFixed(2)})
                            </p>
                            <p className="text-gray-400">Duration:</p>
                            <p className="mb-4">{Math.floor((data.returnDate - Date.now()) / (1000 * 60 * 60 * 24))} days</p>
                            <div className="mt-4">
                                <Btn text="Borrow" css="text-black bg-[#FF4D00] w-full py-2 rounded-md text-center" onClick={() => handleBorrowAllocation(data)} />
                            </div>
                        </div>
                    ))
                ) : (
                    loadingLend ? (
                        <div className="flex items-center justify-center h-32 gap-3 col-span-full">
                            <Spinner size={"3"} />
                            <p className="text-white mt-2 text-2xl">Fetching Lend Data...</p>
                        </div>
                    ) : filteredLendData.slice().reverse().map((data, index) => (
                        <div key={index} className="bg-black rounded-lg p-4 shadow-lg u-class-shadow-4">
                            <div className="flex items-center gap-2 mb-4">
                                <Image src={tokenImageMap[data.loanRequestAddr]?.image} alt={data.loanRequestAddr} width={37} height={36} priority quality={100} />
                                <h2 className="text-lg font-semibold">{tokenImageMap[data.loanRequestAddr]?.label}</h2>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <Image src="/avatar.svg" alt="avatar" width={24} height={24} />
                                <p className="text-gray-400">Origin:</p>
                                <p className="font-semibold">{formatAddress(data.author)}</p>
                            </div>
                            <p className="text-gray-400">Loan Amount:</p>
                            <p className="mb-2">
                                {Number(data.amount)} {tokenImageMap[data.loanRequestAddr]?.label} (~$
                                {(
                                    Number(data.amount) *
                                    (tokenImageMap[data.loanRequestAddr]?.label === "ETH" ? Number(etherPrice) : Number(linkPrice))
                                ).toFixed(2)})
                            </p>
                            <p className="text-gray-400">Rate:</p>
                            <p className="mb-2">{data.interest}%</p>
                            <p className="text-gray-400">Repayment:</p>
                            <p className="mb-2">
                                {Number(data.totalRepayment).toFixed(3)} (~$
                                {(
                                    Number(data.totalRepayment) *
                                    (tokenImageMap[data.loanRequestAddr]?.label === "ETH" ? Number(etherPrice) : Number(linkPrice))
                                ).toFixed(2)})
                            </p>
                            <p className="text-gray-400">Duration:</p>
                            <p className="mb-4">{Math.floor((data.returnDate - Date.now()) / (1000 * 60 * 60 * 24))} days</p>
                            <div className="mt-4">
                                <Btn text="Lend" css="text-black bg-[#FF4D00] w-full py-2 rounded-md text-center" onClick={() => service(data.requestId, data.loanRequestAddr, data.amount)} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CardLayout;
