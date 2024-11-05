import { readOnlyProvider, readOnlyProviderARB, readOnlyProviderOP } from "@/config/provider";
import { SUPPORTED_CHAIN_ID } from "@/context/web3Modal";
import { ethers } from "ethers";
import { 
    USDC_ADDRESS, 
    USDC_ADDRESS_ARB, 
    USDC_ADDRESS_OP 
} from "./addresses";

export const getProviderByChainId = (chainId: any) => {
    switch (chainId) {
        case SUPPORTED_CHAIN_ID[0]: 
            return readOnlyProvider;
        case SUPPORTED_CHAIN_ID[1]: 
            return readOnlyProviderOP;
        case SUPPORTED_CHAIN_ID[2]: 
            return readOnlyProviderARB;
        default:
            return readOnlyProvider;
    }
};

// Function to get USDC address based on chain ID
export const getUsdcAddressByChainId = (chainId: any) => {
    switch (chainId) {
        case SUPPORTED_CHAIN_ID[0]: // Base
            return USDC_ADDRESS;
        case SUPPORTED_CHAIN_ID[1]: // Optimism
            return USDC_ADDRESS_OP;
        case SUPPORTED_CHAIN_ID[2]: // Arbitrum
            return USDC_ADDRESS_ARB;
        default:
            return USDC_ADDRESS;
    }
};

export const getUsdcBalance = async (address: string, chainId: any) => {
    const provider = getProviderByChainId(chainId);
    const usdcAddress = getUsdcAddressByChainId(chainId); // Get the correct USDC address
    
    const usdcontract = new ethers.Contract(
        usdcAddress,
        [
            "function balanceOf(address owner) view returns (uint256)"
        ],
        provider
    );

    const balance = await usdcontract.balanceOf(address);
    return ethers.formatUnits(balance, 6); // USDC typically has 6 decimals
};
