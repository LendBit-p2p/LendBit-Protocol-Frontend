import { readOnlyProvider, readOnlyProviderOP, readOnlyProviderARB } from "@/config/provider";
import { SUPPORTED_CHAIN_ID } from "@/context/web3Modal";
import { ethers } from "ethers";

// Function to select the appropriate provider based on the chain ID
const getProviderByChainId = (chainId:any) => {
    switch (chainId) {
        case SUPPORTED_CHAIN_ID[0]: 
            return readOnlyProvider;
        case SUPPORTED_CHAIN_ID[1]: 
            return readOnlyProviderOP;
        case SUPPORTED_CHAIN_ID[2]: 
            return readOnlyProviderARB;
        default:
            throw new Error("Unsupported chain ID");
    }
};

export const getEthBalance = async (address: string, chainId: any) => {
    const provider = getProviderByChainId(chainId);
    const balance = await provider.getBalance(address);
    const balanceInEth = ethers.formatEther(balance);
    return parseFloat(balanceInEth).toFixed(3);
};
