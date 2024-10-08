"use client";
import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { getLendbitContract } from "@/config/contracts";
import { useRouter } from "next/navigation";
import { ErrorWithReason } from "@/constants/types";

const useCreateLoanListing = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();

  return useCallback(
    async (_amount: number, _min_amount: number, _max_amount: number, _returnDate: number, _interest: number, _loanCurrency: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH TO BASE");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getLendbitContract(signer);

      try {
        const transaction = await contract.createLoanListing(_amount, _min_amount, _max_amount, _returnDate, _interest, _loanCurrency);
        const receipt = await transaction.wait();

        if (receipt.status) {
          toast.success("loan order created!");
          return router.push('/successful');
        }

        toast.error("failed!");
      } catch (error: unknown) {
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Protocol__TokenNotLoanable()") {
          errorText = "token not loanable!";
        }
        if (err?.reason === "Protocol__InsufficientBalance()") {
          errorText = "insufficient balance!";
        }
        if (err?.reason === "Protocol__InsufficientAllowance()") {
          errorText = "insufficient allowance!";
        }
         if (err?.reason === "Protocol__TransferFailed") {
          errorText = "listing action failed!";
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

export default useCreateLoanListing;
