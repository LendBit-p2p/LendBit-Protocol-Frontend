"use client";
import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { getLendbitContract } from "@/config/contracts";
import { useRouter } from "next/navigation";
import { ErrorWithReason } from "@/constants/types";

const useCreateLendingRequest = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();

  return useCallback(
    async (_amount: number, _interest: number, _returnDate: number, _loanCurrency: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH TO BASE");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getLendbitContract(signer);

      try {
        const transaction = await contract.createLendingRequest(_amount, _interest,_returnDate,_loanCurrency);
        const receipt = await transaction.wait();

        if (receipt.status) {
          toast.success("collateral deposited!");
          return router.push('/successful');
        }

        toast.error("failed!");
      } catch (error: unknown) {
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Protocol__TokenNotLoanable()") {
          errorText = "token not loanable!";
        }
        if (err?.reason === "Protocol__InvalidAmount()") {
          errorText = "please input a valid amount!";
        }
        if (err?.reason === "Protocol__InsufficientCollateral()") {
          errorText = "insufficient collateral!";
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

export default useCreateLendingRequest;
