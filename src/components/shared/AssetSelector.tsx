import Image from "next/image";
import { useState } from "react";

const tokenData = [
    {
        token: "USDC",
        icon: "/USDC.svg",
        tokenPrice: 0.99,
    },
    {
        token: "DAI",
        icon: "/dai.svg",
        tokenPrice: 0.99,
    },
    {
        token: "ETH",
        icon: "/eth.svg",
        tokenPrice: 2500,
    },
    {
        token: "LINK",
        icon: "/link.svg",
        tokenPrice: 25,
    },
    {
        token: "USDT",
        icon: "/usdt.svg",
        tokenPrice: 1,
    },
];

interface AssetSelectorProps {
    onTokenSelect: (token: string, tokenPrice: number) => void;
    onAssetValueChange: (value: string) => void;
    assetValue: string; // Controlled by the parent
}

const AssetSelector: React.FC<AssetSelectorProps> = ({ onTokenSelect, onAssetValueChange, assetValue }) => {
    const [selectedToken, setSelectedToken] = useState(tokenData[0]); // Default to the first token
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Toggle dropdown state

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
        const regex = /^\d*\.?\d{0,2}$/; // Allow up to 2 decimal places

        if (regex.test(value)) {
            onAssetValueChange(value); // Update in parent
        }
    };

    // Calculate fiatEquivalent (Amount in USD) within AssetSelector as well
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

                {/* Asset value input */}
                <div className="text-black text-xl">
                    <label htmlFor="assetValue" className="sr-only">Enter Amount</label>
                    <input
                        id="assetValue"
                        type="text"
                        value={assetValue} // Use parent's state as controlled input
                        onChange={handleAssetValueChange}
                        className="text-end bg-transparent w-40 border-b-2 border-gray-300 focus:border-orange-500 focus:outline-none"
                        placeholder="Enter amount"
                        inputMode="decimal"
                    />
                </div>
            </div>

            {/* Helper Text */}
            <p className="text-xs text-gray-500 mb-2 text-end">Enter the amount of <strong>{selectedToken.token}</strong>.</p>

            {/* Price and Fiat Equivalent */}
            <div className="text-black text-xs flex justify-between">
                <p>{`1 ${selectedToken.token} = $${selectedToken.tokenPrice}`}</p>
                <p className="font-bold">≈ ${fiatEquivalent}</p> {/* Show calculated fiat amount */}
            </div>
        </div>
    );
};

export default AssetSelector;
