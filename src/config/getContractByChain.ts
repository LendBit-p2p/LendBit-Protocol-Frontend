import { SUPPORTED_CHAIN_ID } from "@/context/web3Modal";
import { getLendbitContract, getLendbitSpokeARB, getLendbitSpokeOP } from "./contracts";
import { envVars } from "@/constants/envVars";


 // Function to get the correct contract based on chainId
export const getContractByChainId = (signer:any, chainId:any) => {
    switch (chainId) {
      case SUPPORTED_CHAIN_ID[0]: 
        return getLendbitContract(signer); 
      case SUPPORTED_CHAIN_ID[2]: 
        return getLendbitSpokeARB(signer); 
      case SUPPORTED_CHAIN_ID[1]:
        return getLendbitSpokeOP(signer); 
      default:
        throw new Error("Unsupported chain ID");
    }
};
  

export const getAddressesByChainId = (chainId:any) => {
    switch (chainId) {
      case SUPPORTED_CHAIN_ID[0]: 
        return envVars.lendbitDiamondAddress; 
      case SUPPORTED_CHAIN_ID[2]: 
        return envVars.lendbitSpokeARBAddress; 
      case SUPPORTED_CHAIN_ID[1]:
        return envVars.lendbitSpokeOPAddress; 
      default:
        throw new Error("Unsupported chain ID");
    }
};