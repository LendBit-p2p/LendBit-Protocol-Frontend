"use client"
import { useState, useEffect } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { readOnlyProvider } from "@/config/provider";
import { getERC20Contract } from "@/config/contracts";
import { getProviderByChainId, getUsdcAddressByChainId } from "@/constants/utils/getUsdcBalance";
import { getContractAddressesByChainId } from "@/config/getContractByChain";



  
const useCheckAllowance = () => {
    const [val, setVal] = useState(0);
    const { address,isConnected,chainId } = useWeb3ModalAccount()

    useEffect(() => {
        const usdcAddress = getUsdcAddressByChainId(chainId);
        const provider = getProviderByChainId(chainId)
        const destination = getContractAddressesByChainId(chainId)
        console.log("DESTINATION", destination);
        console.log("usdcAddress", usdcAddress);

        
        const contract = getERC20Contract(provider, usdcAddress);

        contract
            .allowance(address, destination)
            .then((res) => {
                console.log("RESPONSESSSS", res);
                setVal(Number(res))
            })
            .catch((err) => {
                console.error("error allowance status: ", err);
                setVal(0);
            });
    }, [address, chainId, isConnected]);

    return val;
}

export default useCheckAllowance;
