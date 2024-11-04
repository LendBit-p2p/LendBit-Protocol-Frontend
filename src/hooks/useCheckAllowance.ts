"use client"
import { useState, useEffect } from "react";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { readOnlyProvider } from "@/config/provider";
import { getERC20Contract } from "@/config/contracts";
import { getUsdcAddressByChainId } from "@/constants/utils/getUsdcBalance";
import { getAddressesByChainId } from "@/config/getContractByChain";



  
const useCheckAllowance = () => {
    const [val, setVal] = useState(0);
    const { address } = useWeb3ModalAccount()
    const { chainId } = useWeb3ModalAccount();

    useEffect(() => {
        const usdcAddress = getUsdcAddressByChainId(chainId);
        const destination = getAddressesByChainId(chainId)
        const contract = getERC20Contract(readOnlyProvider, usdcAddress);

        contract
            .allowance(address, destination)
            .then((res) => {
                // console.log("RESPONSESSSS", res);
                setVal(Number(res))
            })
            .catch((err) => {
                console.error("error allowance status: ", err);
                setVal(0);
            });
    }, [address,chainId]);

    return val;
}

export default useCheckAllowance;
