"use client";
import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { getLendbitContract } from "@/config/contracts";
import { useRouter } from "next/navigation";
import { ErrorWithReason } from "@/constants/types";

const useServiceRequest = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();

  return useCallback(
    async (_requestId: number, _tokenAddress: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH TO BASE");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getLendbitContract(signer);

      try {
        const transaction = await contract.serviceRequest(_requestId, _tokenAddress);
        const receipt = await transaction.wait();

        if (receipt.status) {
          toast.success("collateral deposited!");
          return router.push('/marketplace');
        }

        toast.error("failed!");
      } catch (error: unknown) {
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Protocol__RequestNotOpen()") {
          errorText = "deposit action failed!";
        }
        if (err?.reason === "Protocol__InvalidToken()") {
          errorText = "insufficient balance!";
        }
        if (err?.reason === "Protocol__InsufficientCollateral()") {
          errorText = "insufficient collateral!";
        }
        if (err?.reason === "Protocol__InsufficientBalance()") {
          errorText = "insufficient balance!";
        }
        if (err?.reason === "Protocol__InsufficientAllowance()") {
          errorText = "insufficient allowance!";
        }
        else {
          errorText = "trying to resolve error!";
        }

        toast.warning(`Error: ${errorText}`);
      }
    },
    [chainId, walletProvider]
  );
};

export default useServiceRequest;
