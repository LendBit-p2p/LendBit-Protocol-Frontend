"use client";
import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { getLendbitContract, getERC20Contract, getLendbitSpokeARB, getLendbitSpokeOP } from "@/config/contracts";
import { useRouter } from "next/navigation";
import { ErrorWithReason } from "@/constants/types";
import { ethers, MaxUint256 } from "ethers";
// import { USDC_ADDRESS, USDC_ADDRESS_ARB, USDC_ADDRESS_OP } from "@/constants/utils/addresses";
import useCheckAllowance from "./useCheckAllowance";
import { envVars } from "@/constants/envVars";
import { getContractAddressesByChainId, getContractByChainId } from "@/config/getContractByChain";
import { getUsdcAddressByChainId } from "@/constants/utils/getUsdcBalance";

const useDepositCollateral = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();
  const val = useCheckAllowance();



  return useCallback(
    async (_amountOfCollateral: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const usdcAddress = getUsdcAddressByChainId(chainId);
      const destination = getContractAddressesByChainId(chainId)


      const erc20contract = getERC20Contract(signer, usdcAddress);
      const contract =   getContractByChainId(signer, chainId);
      const _weiAmount = ethers.parseUnits(_amountOfCollateral, 18);
      let toastId: string | number | undefined;

      try {
        toastId = toast.loading(`Processing deposit transaction...`);
        // Check allowance before proceeding
        if (val == 0 || val < Number(_amountOfCollateral)) {
          const allowance = await erc20contract.approve(destination, MaxUint256);
          const allReceipt = await allowance.wait();

          if (!allReceipt.status) {
            return toast.error("Approval failed!", { id: toastId });
          }
        }



        const transaction = await contract.depositCollateral(usdcAddress, _weiAmount);
        const receipt = await transaction.wait();

        if (receipt.status) {
          toast.success(`${_amountOfCollateral} USDC successfully deposited as collateral!`, { id: toastId });
          return router.push('/');
        } else {
          toast.error(`Failed to deposit ${_amountOfCollateral} USDC as collateral.`, { id: toastId });
        }

      } catch (error: unknown) {
        console.error(error);

        const err = error as ErrorWithReason;
        let errorText: string = err?.reason === "Protocol__TransferFailed"
          ? "Deposit action failed!"
          : "Action canceled or failed!";

        if (toastId) {
          toast.error(`Error: ${errorText}`, { id: toastId });
        } else {
          toast.warning(`Error: ${errorText}`);
        }
      }
    },
    [chainId, walletProvider, router, val]
  );
};

export default useDepositCollateral;
