"use client";

import { useCallback } from "react";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";
import { toast } from "sonner";
import { isSupportedChain } from "@/config/chain";
import { getProvider } from "@/config/provider";
import { getLendbitContract } from "@/config/contracts";

type ErrorWithReason = {
  reason?: string;
  message?: string;
};

const useDepositCollateral = () => {
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();


  return useCallback(
    async(battleId:number, time:number, link:string) => {
      if (!isSupportedChain(chainId)) return toast.warning("wrong network | Connect your wallet");
      const readWriteProvider = getProvider(walletProvider);
      const signer = await readWriteProvider.getSigner();

      const contract = getLendbitContract(signer);

      try {
        // const transaction = await contract.acceptBattle(battleId,time,link);
        // const receipt = await transaction.wait();

        // if (receipt.status) {
        //   return toast.success("battle declined!");
        // }

        toast.error("failed!");
      } catch (error: unknown) {
        // console.log(error);
        const err = error as ErrorWithReason;
        let errorText: string;

        if (err?.reason === "Only the opponent can accept") {
          errorText = "only the opponent can decline!";
        }
        else if (err?.reason === "Battle is not in pending state") {
          errorText = "only pending battles can be acccepted!";
        }
        else if (err?.reason === "Accept deadline has passed") {
          errorText = "can't accept battle, timeout error";
          
        }
        else {
            // console.log(err?.message);
            
          errorText ="trying to resolve error!";
        }

        toast.warning(`Error: ${errorText}`);
      }
    },
    [chainId, walletProvider]
  );
};

export default useDepositCollateral;
