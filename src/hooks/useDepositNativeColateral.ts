"use client";
import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { useRouter } from "next/navigation";
import { ErrorWithReason } from "@/constants/types";
import { ADDRESS_1 } from "@/constants/utils/addresses";
import { ethers } from "ethers";
import { getContractByChainId } from "@/config/getContractByChain";
import { SUPPORTED_CHAIN_ID } from "@/context/web3Modal";

const useDepositNativeCollateral = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();

  return useCallback(
    async (_amountOfCollateral: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH TO SUPPORTED CHAINS");
      
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const amount = ethers.parseEther(_amountOfCollateral);
      // const contract = getLendbitContract(signer);
      const contract =   getContractByChainId(signer, chainId);

      
      
      let toastId: string | number | undefined;

      try {
        // Show loading toast when starting the transaction
        toastId = toast.loading(`Signing deposit transaction...`);

        let transaction;

        if (chainId === SUPPORTED_CHAIN_ID[0]) {
            transaction = await contract.depositCollateral(ADDRESS_1, amount, {
            value: amount,
          });
        } else {
          const gasFee = await contract.quoteCrossChainCost(10004);

          // Start the transaction
         transaction = await contract.depositCollateral(ADDRESS_1, amount, {
          value: amount+ gasFee,
        });

        }     
       
        // Wait for the transaction to be mined
        const receipt = await transaction.wait();

        // Update the loading toast based on the transaction receipt
        if (receipt.status) {
          toast.success(`${_amountOfCollateral} ETH successfully deposited as collateral!`, {
            id: toastId,
          });
          if (chainId !== SUPPORTED_CHAIN_ID[0]) {
            toast.message(`Kindly wait for few minutes for your deposited ${_amountOfCollateral} ETH to go cross-chain!`)
          }
          router.push('/');
        } else {
          toast.error("Transaction failed!", {
            id: toastId,
          });   
        }
      } catch (error: unknown) {
        // Handle error, update the loading toast to show an error message
        const err = error as ErrorWithReason;
        // console.error(contract.interface.parseError("0xc6826680"));

        let errorText: string;

        if (err?.reason === "Protocol__TransferFailed") {
          errorText = "Deposit action failed!";
        }
        if (err?.reason === "spoke__InsufficientGasFee") {
          errorText = "Deposit action failed!";
        }
        else {
          errorText = "Transaction canceled or failed!";
        }

        console.error(error);

        // If a toast was shown, update it with the error message
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

export default useDepositNativeCollateral;
