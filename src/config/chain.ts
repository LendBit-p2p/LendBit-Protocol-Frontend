import { SUPPORTED_CHAIN_ID } from "@/context/web3Modal";


// export const isSupportedChain = (
//   chainId: number | undefined
// ): chainId is number =>
//   chainId !== undefined && Number(chainId) === SUPPORTED_CHAIN_ID;

export const isSupportedChain = (
  chainId: number | undefined
): boolean => chainId !== undefined && SUPPORTED_CHAIN_ID.includes(chainId);
