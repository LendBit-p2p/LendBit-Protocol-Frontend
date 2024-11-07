"use client";

import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { getERC20Contract, getLendbitContract } from "@/config/contracts";
import { ErrorWithReason } from "@/constants/types";
import useCheckAllowance from "./useCheckAllowance";
import { ADDRESS_1 } from "@/constants/utils/addresses";
import { MaxUint256 } from "ethers";
import { getContractAddressesByChainId, getContractByChainId } from "@/config/getContractByChain";
import { getUsdcAddressByChainId } from "@/constants/utils/getUsdcBalance";
import { SUPPORTED_CHAIN_ID } from "@/context/web3Modal";

const useRepayLoan = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const allowance = useCheckAllowance();

  return useCallback(
    async (_requestId: number, _tokenAddress: string, _amount: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getContractByChainId(signer, chainId);
      const destination = getContractAddressesByChainId(chainId)
      const usdcAddress = getUsdcAddressByChainId(chainId);



      // const _amount = ethers.parseEther(_amount); 
      // console.log(_requestId, _tokenAddress,_amount, _amount);

      let loadingToastId: string | number | undefined;

      try {
        loadingToastId = toast.loading("Please wait!... Processing repayments");

        // If the token address is ADDRESS_1, directly call repayLoan for native token (like ETH)
        if (_tokenAddress === ADDRESS_1) {

        let transaction;
        if (SUPPORTED_CHAIN_ID[0] === chainId) {
          transaction = await contract.repayLoan(_requestId, _amount, {
              value: _amount,
            });
            
          } else {
            const gasFee = await contract.quoteCrossChainCost(10004);

            // console.log("GAS", gasFee)
          transaction = await contract.repayLoan(_requestId, _amount, {
              value: _amount + gasFee,
            });
        }
          

          const receipt = await transaction.wait();

          if (receipt.status) {
            return toast.success("Outstanding payed!", {
              id: loadingToastId,
            });
          }

          return toast.error("Repayment failed!", {
            id: loadingToastId,
          });
        }

        // If the token is a different ERC-20 token (e.g., USDC), check allowance first
        if (_tokenAddress !== ADDRESS_1) {
          const erc20Contract = getERC20Contract(signer, usdcAddress);

          // Check if allowance is sufficient
          if (allowance === 0 || allowance < Number(_amount)) {
            const approvalTx = await erc20Contract.approve(destination, MaxUint256);
            const approvalReceipt = await approvalTx.wait();

            if (!approvalReceipt.status) {
              return toast.error("Approval failed!", {
                id: loadingToastId,
              });
            }
          }

          // Proceed with repayment after approval check
          let transaction;
          if (SUPPORTED_CHAIN_ID[0] === chainId) {
            transaction = await contract.repayLoan(_requestId, _amount);
              
            } else {
              const gasFee = await contract.quoteCrossChainCost(10004);

              // console.log("GAS", gasFee)
              transaction = await contract.repayLoan(_requestId, _amount, {
                value: gasFee,
              });
          }    

          const receipt = await transaction.wait();

          if (receipt.status) {
            return toast.success("Outstanding payed!", {
              id: loadingToastId,
            });
          }

          return toast.error("Repayment failed!", {
            id: loadingToastId,
          });
        }
      } catch (error: unknown) {
        const err = error as ErrorWithReason;
        let errorText: string;

        // Handle different error reasons from the protocol
        switch (err?.reason) {
          case "Protocol__RequestNotServiced":
            errorText = "Repayment action failed!";
            break;
          case "Protocol__InvalidToken":
          case "Protocol__InsufficientBalance":
            errorText = "Insufficient balance!";
            break;
          case "Protocol__InsufficientAllowance":
            errorText = "Insufficient allowance!";
            break;
          case "Protocol__MustBeMoreThanZero":
            errorText = "No outstanding to repay!";
            break;
          default:
            errorText = "Trying to resolve error!";
        }

        toast.warning(`Error: ${errorText}`, {
          id: loadingToastId,
        });
      }
    },
    [chainId, walletProvider, allowance]
  );
};

export default useRepayLoan;
