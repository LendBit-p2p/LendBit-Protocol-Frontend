"use client";
import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { useRouter } from "next/navigation";
import { ErrorWithReason } from "@/constants/types";
import { ethers } from "ethers";
import { getContractByChainId } from "@/config/getContractByChain";
import { ADDRESS_1 } from "@/constants/utils/addresses";
import { SUPPORTED_CHAIN_ID } from "@/context/web3Modal";

const useWithdrawCollateral = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();

  return useCallback(
    async (_tokenCollateralAddress: string, _amountOfCollateral: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getContractByChainId(signer, chainId);

      let toastId: string |number | undefined;

      try {
        let _weiAmount;
        if(_tokenCollateralAddress === ADDRESS_1) {
          _weiAmount = ethers.parseUnits(_amountOfCollateral, 18);

        } else {
          _weiAmount = ethers.parseUnits(_amountOfCollateral, 6);
        }
        
        // Show loading toast when the withdraw transaction is initiated
        toastId = toast.loading(`Signing tx... Withdrawing collateral...`);

        let transaction;
        if (SUPPORTED_CHAIN_ID[0] === chainId) {
          transaction = await contract.withdrawCollateral(_tokenCollateralAddress, _weiAmount);
          
        } else {
          const gasFee = await contract.quoteCrossChainCost(10004);

          // console.log("GAS", gasFee)
         transaction = await contract.withdrawCollateral(_tokenCollateralAddress, _weiAmount, {
            value: gasFee,
          });
        }
        
        const receipt = await transaction.wait();

        if (receipt.status) {
          toast.success(`${_amountOfCollateral} successfully withdrawn!`, {
            id: toastId,
          });
          return router.push('/');
        } else {
          toast.error("Failed to withdraw collateral.", {
            id: toastId,
          });
        }
      } catch (error: unknown) {
        console.error(error);
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Protocol__InsufficientCollateralDeposited") {
          errorText = "Insufficient collateral!";
        } else if (err?.reason === "Protocol__TransferFailed") {
          errorText = "Transaction failed!";
        } else {
          errorText = "Action canceled or failed!";
        }

        if (toastId) {
          toast.error(`Error: ${errorText}`, { id: toastId });
        } else {
          // Fallback toast if no loading toast was created
          toast.warning(`Error: ${errorText}`);
        }
      }
    },
    [chainId, walletProvider, router]
  );
};

export default useWithdrawCollateral;
