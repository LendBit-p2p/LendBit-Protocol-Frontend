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
import { LINK_ADDRESS } from "@/constants/utils/addresses";

const useDepositCollateral = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();

  return useCallback(
    async (_amountOfCollateral: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH TO BASE");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const erc20contract = getERC20Contract(signer, LINK_ADDRESS);
      const contract = getLendbitContract(signer);

      let toastId: string | number | undefined;

      try {
        const _weiAmount = ethers.parseUnits(_amountOfCollateral, 18);

        const allowance = await erc20contract.approve(contract.getAddress(), _weiAmount);        
        const allReceipt = await allowance.wait();

        if (allReceipt.status) {
          toastId = toast.loading(`Sign deposit transaction...`);

          const transaction = await contract.depositCollateral(LINK_ADDRESS, _weiAmount);
          const receipt = await transaction.wait();
          if (receipt.status) {
            toast.success(`${_amountOfCollateral} LINK successfully deposited as collateral!`, {
              id: toastId,
            });
            return router.push('/');
          } else {
            toast.error(`Failed to deposit ${_amountOfCollateral} LINK as collateral.`, {
              id: toastId,
            });
          }
        } else {
          toast.error("Approval failed!");
        }

      } catch (error: unknown) {
        console.error(error);

        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Protocol__TransferFailed()") {
          errorText = "Deposit action failed!";
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

export default useDepositCollateral;
