"use client";
import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { getLendbitContract } from "@/config/contracts";
import { useRouter } from "next/navigation";
import { ErrorWithReason } from "@/constants/types";

const useDepositCollateral = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();

  return useCallback(
    async (_tokenCollateralAddress: string, _amountOfCollateral: number) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH TO BASE");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getLendbitContract(signer);

      try {
        const transaction = await contract.depositCollateral(_tokenCollateralAddress, _amountOfCollateral);
        const receipt = await transaction.wait();

        if (receipt.status) {
          toast.success("collateral deposited!");
          return router.push('/successful');
        }

        toast.error("failed!");
      } catch (error: unknown) {
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Protocol__TransferFailed()") {
          errorText = "deposit action failed!";
        } else {
          errorText = "trying to resolve error!";
        }

        toast.warning(`Error: ${errorText}`);
      }
    },
    [chainId, walletProvider]
  );
};

export default useDepositCollateral;
