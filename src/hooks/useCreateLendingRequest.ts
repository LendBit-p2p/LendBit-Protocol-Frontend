"use client";
import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { useRouter } from "next/navigation";
import { ErrorWithReason } from "@/constants/types";
import { ethers } from "ethers";
import { ADDRESS_1 } from "@/constants/utils/addresses";
import { getContractByChainId } from "@/config/getContractByChain";
import { getUsdcAddressByChainId } from "@/constants/utils/getUsdcBalance";
import { SUPPORTED_CHAIN_ID } from "@/context/web3Modal";

const useCreateLendingRequest = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const router = useRouter();

  return useCallback(
    async (_amount: string, _interest: number, _returnDate: number, _loanCurrency: string) => {
      if (!isSupportedChain(chainId)) return toast.warning("SWITCH NETWORK", { duration: 1000 });
     
      let _weiAmount;
      let currency;
      if (_loanCurrency === "ETH") {
        currency = ADDRESS_1;
        _weiAmount = ethers.parseEther(_amount);

        // return toast.warning("PLEASE USE LINK, ETH NOT AVAILABLE AT THE MOMENT")
      } else {
        const usdcAddress = getUsdcAddressByChainId(chainId);
        
        currency = usdcAddress;
        _weiAmount = ethers.parseUnits(_amount, 6);
      }

      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();
      const contract =   getContractByChainId(signer, chainId);


      let loadingToastId;
      
      try {
        loadingToastId = toast.loading("Processing borrowing request...");

        const _basisPointInterest = _interest;

        // console.log("_loanCurrency", _weiAmount,);

         let transaction;
        if (SUPPORTED_CHAIN_ID[0] === chainId) {
          transaction = await contract.createLendingRequest(_weiAmount, _basisPointInterest, _returnDate, currency);
          
        } else {
          const gasFee = await contract.quoteCrossChainCost(10004);

          // console.log("GAS", gasFee)
         transaction = await contract.createLendingRequest(_weiAmount, _basisPointInterest, _returnDate, currency, {
            value: gasFee,
          });
        }

        
        const receipt = await transaction.wait();

        if (receipt.status && SUPPORTED_CHAIN_ID[0] == chainId) {
          toast.success("Loan Pool created!", {
            id: loadingToastId,
          });
          return router.push('/successful');
        } else if (receipt.status && (chainId !== SUPPORTED_CHAIN_ID[0])) {
          toast.success("Loan Pool created, kindly wait for few minutes!", {
            id: loadingToastId,
          });
          return router.push('/successful');

        } else {
          toast.error("Pool creation failed!", {
            id: loadingToastId,
          });
        }

      } catch (error: unknown) {
        const err = error as ErrorWithReason;
        let errorText: string;

        switch (err?.reason) {
          case "Protocol__TokenNotLoanable()":
            errorText = "Token not loanable!";
            break;
          case "Protocol__InvalidAmount()":
            errorText = "Please input a valid amount!";
            break;
          case "Protocol__InsufficientCollateral()":
            errorText = "Insufficient collateral!";
            break;
          default:
            errorText = "Canceled | Can't borrow more than your available balance!";
        }

        toast.warning(`Error: ${errorText}`, {
          id: loadingToastId,
        });
        console.log("error", error);
      }
    },
    [chainId, walletProvider]
  );
};

export default useCreateLendingRequest;
