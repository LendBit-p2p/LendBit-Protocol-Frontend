import { useEffect, useState } from "react";
import Image from "next/image";
import { AssetSelectorProps } from "@/constants/types";
import { getEthBalance } from "@/constants/utils/getEthBalance";
import { tokenData } from "@/constants/utils/tokenData";
import { getLinkBalance } from "@/constants/utils/getLinkBalance";


const AssetSelector: React.FC<AssetSelectorProps> = ({
    onTokenSelect,
    onAssetValueChange,
    assetValue,
    userAddress
}) => {
    const [selectedToken, setSelectedToken] = useState(tokenData[0]); // Default to the first token
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Toggle dropdown state
    const [walletBalance, setWalletBalance] = useState("0"); // User's token balance


   

    // Fetch wallet balance based on the selected token
    useEffect(() => {
        const fetchBalance = async () => {
            if (userAddress) {
                let balance;
                if (selectedToken.token === "ETH") {
                    balance = await getEthBalance(userAddress);
                } else if (selectedToken.token === "LINK") {
                    balance = await getLinkBalance(userAddress);
                }
                setWalletBalance(Number(balance).toFixed(3) || "0");
            }
        };
        fetchBalance();
    }, [selectedToken, userAddress]);

    // Function to handle token selection from dropdown
    const handleTokenSelect = (token: string) => {
        const selected = tokenData.find((item) => item.token === token);
        if (selected) {
            setSelectedToken(selected);
            onTokenSelect(selected.token, selected.tokenPrice); // Notify parent component
        }
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown open/close
    };

    // Handle asset value input change and notify parent component
    const handleAssetValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const regex = /^\d*\.?\d{0,3}$/; // Allow up to 3 decimal places

        if (regex.test(value)) {
            onAssetValueChange(value); // Update in parent
        }
    };

    // Handle clicking the "Max" button
    const handleMaxClick = () => {
        onAssetValueChange(walletBalance || "0"); // Ensure wallet balance is a valid string
    };

    // Calculate fiatEquivalent (Amount in USD)
    const fiatEquivalent = (parseFloat(assetValue) * selectedToken.tokenPrice).toFixed(2);

    return (
        <div className="bg-white rounded-lg p-3">
            <div className="text-black flex justify-between mb-3 items-center">
                <div
                    className="relative bg-black rounded-md p-2 gap-3 flex items-center cursor-pointer"
                    onClick={toggleDropdown}
                >
                    {/* Token icon */}
                    <div className="rounded-full px-1 py-[0.5px] flex items-center justify-center">
                        <Image
                            src={selectedToken.icon}
                            alt={selectedToken.token}
                            width={18}
                            height={18}
                            priority
                            quality={100}
                        />
                    </div>

                    {/* Token name */}
                    <div className="text-white text-xs">
                        <p>{selectedToken.token}</p>
                    </div>

                    {/* Chevron for dropdown */}
                    <div>
                        <Image
                            src={"/chevronDown.svg"}
                            alt="dropdown indicator"
                            width={10}
                            height={5}
                            priority
                            quality={100}
                            className="text-[#A2A8B4]"
                        />
                    </div>

                    {/* Dropdown */}
                    {isDropdownOpen && (
                        <div className="absolute top-full left-0 mt-2 w-[100px] bg-black rounded-md z-20">
                            {tokenData.map((token) => (
                                <div
                                    key={token.token}
                                    onClick={() => handleTokenSelect(token.token)}
                                    className="flex gap-2 items-center p-2 cursor-pointer hover:bg-gray-800"
                                >
                                    <Image
                                        src={token.icon}
                                        alt={token.token}
                                        width={14}
                                        height={14}
                                        priority
                                        quality={100}
                                    />
                                    <p className="text-white text-xs">{token.token}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Asset value input with Max button */}
                <div className="flex items-center">
                    <label htmlFor="assetValue" className="sr-only">Enter Amount</label>
                    <input
                        id="assetValue"
                        type="text"
                        value={assetValue} // Use parent's state as controlled input
                        onChange={handleAssetValueChange}
                        className="text-end bg-transparent w-28 border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none"
                        placeholder="Enter amount"
                        inputMode="decimal"
                    />
                    {/* Max Button */}
                    <button
                        onClick={handleMaxClick}
                        className="ml-2 bg-gray-200 hover:bg-gray-300 text-black px-2 py-1 rounded text-sm"
                    >
                        Max
                    </button>
                </div>
            </div>

            {/* Wallet balance display */}
            <p className="text-xs text-gray-500 mb-2">Wallet Balance: {walletBalance || "0"} {selectedToken.token}</p>

            {/* Price and Fiat Equivalent */}
            <div className="text-black text-xs flex justify-between">
                <p>{`1 ${selectedToken.token} = $${selectedToken.tokenPrice}`}</p>
                <p className="font-bold">≈ ${fiatEquivalent}</p> {/* Show calculated fiat amount */}
            </div>
        </div>
    );
};

export default AssetSelector;
