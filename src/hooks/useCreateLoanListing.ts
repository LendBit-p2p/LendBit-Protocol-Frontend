"use client";
import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { getERC20Contract, getLendbitContract } from "@/config/contracts";
import { useRouter } from "next/navigation";
import { ErrorWithReason } from "@/constants/types";
import { ethers } from "ethers";
import { ADDRESS_1, LINK_ADDRESS } from "@/constants/utils/addresses";

const useCreateLoanListing = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();

  return useCallback(
    async (_amount: string, _min_amount: number, _max_amount: number, _returnDate: number, _interest: number, _loanCurrency: string) => {
       
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH TO BASE");

      let currency;
      if (_loanCurrency == "ETH") {
        currency = ADDRESS_1;
      } else {
        currency = LINK_ADDRESS;
      }

      console.log("_loanCurrency", _loanCurrency, _min_amount, _amount, _max_amount, _returnDate, _interest, currency);

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract = getLendbitContract(signer);

      let loadingToastId;

      try {
        const _weiAmount = ethers.parseUnits(_amount, 18);
        const _min_amount_wei = ethers.parseUnits(_min_amount.toString(), 18);
        const _max_amount_wei = ethers.parseUnits(_max_amount.toString(), 18);

        // Start a loading toast
        loadingToastId = toast.loading("Processing order...");

        if (_loanCurrency === "ETH") {
          // Handle ETH transfers without ERC20 approval
          const transaction = await contract.createLoanListing(
            _weiAmount,
            _min_amount_wei,
            _max_amount_wei,
            _returnDate,
            _interest,
            currency,
            { value: _weiAmount } // Sends ETH with the transaction
          );
          const receipt = await transaction.wait();

          if (receipt.status) {
            toast.success("Loan order created with ETH!", {
              id: loadingToastId,
            });
            return router.push('/successful');
          } else {
            toast.error("Transaction failed!", {
              id: loadingToastId,
            });
          }
        } else {
          // Handle ERC-20 transfers with approval
          const erc20contract = getERC20Contract(signer, LINK_ADDRESS);

          const allowance = await erc20contract.approve(contract.getAddress(), _weiAmount);
          await allowance.wait();

          const transaction = await contract.createLoanListing(_weiAmount, _min_amount_wei, _max_amount_wei, _returnDate, _interest, currency);
          const receipt = await transaction.wait();

          if (receipt.status) {
            toast.success("Loan order created!", {
              id: loadingToastId,
            });
            return router.push('/successful');
          } else {
            toast.error("Transaction failed!", {
              id: loadingToastId,
            });
          }
        }

      } catch (error: unknown) {
        const err = error as ErrorWithReason;
        let errorText: string;

        switch (err?.reason) {
          case "Protocol__TokenNotLoanable()":
            errorText = "Token not loanable!";
            break;
          case "Protocol__InsufficientBalance()":
            errorText = "Insufficient balance!";
            break;
          case "Protocol__InsufficientAllowance()":
            errorText = "Insufficient allowance!";
            break;
          case "Protocol__TransferFailed":
            errorText = "Listing action failed!";
            break;
          default:
            errorText = "Trying to resolve error!";
        }

        toast.warning(`Error: ${errorText}`, {
          id: loadingToastId,
        });
        console.log("ERROR", error);
      }
    },
    [chainId, walletProvider]
  );
};

export default useCreateLoanListing;
