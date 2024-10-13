import { getLendbitContract } from "@/config/contracts";
import { readOnlyProvider } from "@/config/provider";
import { ADDRESS_1, LINK_ADDRESS } from "@/constants/utils/addresses";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useGetValueAndHealth = () => {
   const [data, setData] = useState<bigint | null>(null);
  const [data2, setData2] = useState<bigint | null>(null);
  const [data3, setData3] = useState<number | null>(null);
  const [data4, setData4] = useState<number | null>(null);
  const [collateralVal, setCollateralVal] = useState<number | string | null>(null);

  const { address } = useWeb3ModalAccount();


  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const contract = getLendbitContract(readOnlyProvider);
        const res = await contract.getAccountCollateralValue(address);
        const res2 = await contract.getHealthFactor(address)
        const res3 = await contract.gets_addressToCollateralDeposited(address, ADDRESS_1);
        const res4 = await contract.gets_addressToCollateralDeposited(address, LINK_ADDRESS);

        // console.log("DATA 1", data, "DATA2", data2);
        const weiBal = ethers.formatEther(res3);
        const weiBal2 = ethers.formatEther(res4);

        const totalValue = ((Number(weiBal) * 2500) + (Number(weiBal2) * 11)).toFixed(2)
      
        setData(res);
        setData2(res2);
        setData3(Number(weiBal));
        setData4(Number(weiBal2));
        setCollateralVal(totalValue)

      } catch (err) {
        console.error(err);
      }
    };

    if (address) {
      fetchUserStatus();
    }
  }, [address]);

  return {data, data2, data3, data4, collateralVal};
};

export default useGetValueAndHealth;
