"use client";

import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { getERC20Contract, getLendbitContract } from "@/config/contracts";
import { ErrorWithReason } from "@/constants/types";
import useCheckAllowance from "./useCheckAllowance";
import { LINK_ADDRESS, ADDRESS_1 } from "@/constants/utils/addresses";
import { MaxUint256 } from "ethers";
import { envVars } from "@/constants/envVars";

const useRepayLoan = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const allowance = useCheckAllowance();

  return useCallback(
    async (_requestId: number, _tokenAddress: string, _amount: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH TO BASE");
      
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getLendbitContract(signer);

      // const _amount = ethers.parseEther(_amount); 
      console.log(_requestId, _tokenAddress,_amount, _amount);


      try {
        // If the token address is ADDRESS_1, directly call repayLoan for native token (like ETH)
        if (_tokenAddress === ADDRESS_1) {
          const transaction = await contract.repayLoan(_requestId, _amount);
          
          const receipt = await transaction.wait();

          if (receipt.status) {
            return toast.success("Outstanding payed!");
          }

          return toast.error("Repayment failed!");
        }

        // If the token is a different ERC-20 token (e.g., LINK), check allowance first
        if (_tokenAddress === LINK_ADDRESS || _tokenAddress !== ADDRESS_1) {
          const erc20Contract = getERC20Contract(signer, _tokenAddress);

          // Check if allowance is sufficient
          if (allowance === 0 || allowance < Number(_amount)) {
            const approvalTx = await erc20Contract.approve(envVars.lendbitDiamondAddress, MaxUint256);
            const approvalReceipt = await approvalTx.wait();

            if (!approvalReceipt.status) {
              return toast.error("Approval failed!");
            }
          }

          // Proceed with repayment after approval check
          const transaction = await contract.repayLoan(_requestId, _amount);
          const receipt = await transaction.wait();

          if (receipt.status) {
            return toast.success("Collateral deposited!");
          }

          return toast.error("Repayment failed!");
        }
      } catch (error: unknown) {
        const err = error as ErrorWithReason;
        let errorText: string;

        // Handle different error reasons from the protocol
        switch (err?.reason) {
          case "Protocol__RequestNotServiced()":
            errorText = "Repayment action failed!";
            break;
          case "Protocol__InvalidToken()":
          case "Protocol__InsufficientBalance()":
            errorText = "Insufficient balance!";
            break;
          case "Protocol__InsufficientAllowance()":
            errorText = "Insufficient allowance!";
            break;
           case "Protocol__MustBeMoreThanZero":
            errorText = "No outstanding to repay!";
            break;
          default:
            errorText = "Trying to resolve error!";
        }

        toast.warning(`Error: ${errorText}`);
      }
    },
    [chainId, walletProvider, allowance]
  );
};

export default useRepayLoan;
