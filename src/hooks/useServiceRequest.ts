"use client";

import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { getERC20Contract } from "@/config/contracts";
import { useRouter } from "next/navigation";
import { ErrorWithReason } from "@/constants/types";
import useCheckAllowance from "./useCheckAllowance";
import { ADDRESS_1 } from "@/constants/utils/addresses";
import { ethers, MaxUint256 } from "ethers";
import { getContractAddressesByChainId, getContractByChainId } from "@/config/getContractByChain";
import { getUsdcAddressByChainId } from "@/constants/utils/getUsdcBalance";
import { SUPPORTED_CHAIN_ID } from "@/context/web3Modal";

const useServiceRequest = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();
  const val = useCheckAllowance();

  return useCallback(
    async (_requestId: number, _tokenAddress: string, _amount: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getContractByChainId(signer, chainId);
      const destination = getContractAddressesByChainId(chainId)
      const usdcAddress = getUsdcAddressByChainId(chainId);

      let loadingToastId: string | number | undefined;

      try {
        
        loadingToastId = toast.loading("Processing service request...");
        // If the token address is ADDRESS_1, directly call serviceRequest
        if (_tokenAddress === ADDRESS_1) {

          let transaction;
          if (SUPPORTED_CHAIN_ID[0] === chainId) {
            transaction = await contract.serviceRequest(_requestId, _tokenAddress, {
              value: ethers.parseEther(_amount),
            });
              
          } else {
            const gasFee = await contract.quoteCrossChainCost(10004);

              // console.log("GAS", gasFee)
            transaction = await contract.serviceRequest(_requestId, _tokenAddress, {
              value: ethers.parseEther(_amount) + gasFee,
            });
          }    


          const receipt = await transaction.wait();

          if (receipt.status) {
            return toast.success("Request serviced!",
            {
              id: loadingToastId,
            });
          
          }

          return toast.error("Request servicing failed!");
        }

        // If the token address is USDC, check allowance
        if (_tokenAddress !== ADDRESS_1) {
          const erc20contract = getERC20Contract(signer, usdcAddress);

          // Check if allowance is sufficient
          if (val === 0 || val < Number(_amount)) {
            const allowanceTx = await erc20contract.approve(destination, MaxUint256);
            const allowanceReceipt = await allowanceTx.wait();

            if (!allowanceReceipt.status) {
              return toast.error("Approval failed!",
                {
                id: loadingToastId,
              });
            }
          }

           // Proceed with repayment after approval check
          let transaction;
          if (SUPPORTED_CHAIN_ID[0] === chainId) {
            await contract.serviceRequest(_requestId, _tokenAddress);
              
            } else {
              const gasFee = await contract.quoteCrossChainCost(10004);

              // console.log("GAS", gasFee)
              transaction = await contract.repayLoan(_requestId, _tokenAddress, {
                value: gasFee,
              });
          }    


          const receipt = await transaction.wait();

          if (receipt.status) {
            return toast.success("Request serviced!",
              {
                id: loadingToastId,
              });
          }

          return toast.error("request servicing failed!",
            {
              id: loadingToastId,
            }
          );
        }
      } catch (error: unknown) {
        const err = error as ErrorWithReason;
        let errorText: string;

        // Handle protocol-specific error reasons
        switch (err?.reason) {
          case "Protocol__RequestNotOpen":
            errorText = "Deposit action failed!";
            break;
          case "Protocol__InvalidToken":
            errorText = "Invalid token type!";
            break;
          case "Protocol__InsufficientBalance":
            errorText = "Insufficient balance!";
            break;
          case "Protocol__InsufficientCollateral":
            errorText = "Insufficient collateral!";
            break;
          case "Protocol__InsufficientAllowance":
            errorText = "Insufficient allowance!";
            break;
          default:
            errorText = "Trying to resolve error!";
        }

        toast.warning(`Error: ${errorText}`, {
              id: loadingToastId,
            });
      }
    },
    [chainId, walletProvider, val]
  );
};

export default useServiceRequest;
