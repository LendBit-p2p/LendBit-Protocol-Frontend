"use client";
import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { getLendbitContract, getERC20Contract } from "@/config/contracts";
import { useRouter } from "next/navigation";
import { ErrorWithReason } from "@/constants/types";
import { ethers } from "ethers";

const useDepositCollateral = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();

  return useCallback(
    async (_tokenCollateralAddress: string, _amountOfCollateral: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH TO BASE");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const erc20contract = getERC20Contract(signer, _tokenCollateralAddress);
      const contract = getLendbitContract(signer);

      try {
        const _weiAmount = ethers.parseUnits(_amountOfCollateral, 18);
        const allowance = await erc20contract.approve(contract.getAddress(), _weiAmount);
        await allowance.wait();

        const transaction = await contract.depositCollateral(_tokenCollateralAddress, _weiAmount);
        const receipt = await transaction.wait();

        if (receipt.status) {
          toast.success("collateral deposited!");
          return router.push('/successful');
        }

        toast.error("failed!");
      } catch (error: unknown) {
        console.error(error);
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