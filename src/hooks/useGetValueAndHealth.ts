import { getLendbitContract } from "@/config/contracts";
import { readOnlyProvider } from "@/config/provider";
import { ADDRESS_1, LINK_ADDRESS } from "@/constants/utils/addresses";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const useGetValueAndHealth = (address: string | null | any) => {
  const [data, setData] = useState<bigint | null>(null);
  const [data2, setData2] = useState<bigint | null>(null);
  const [data3, setData3] = useState<number | null>(null);
  const [data4, setData4] = useState<number | null>(null);
  const [collateralVal, setCollateralVal] = useState<number | string | null>(null);
  const [data5, setData5]= useState<any>(null)

  useEffect(() => {
    const fetchUserStatus = async () => {
      if (!address) return;
      try {
        const contract = getLendbitContract(readOnlyProvider);

        const res = await contract.getAccountCollateralValue(address);
        const res2 = await contract.getHealthFactor(address);
        const res3 = await contract.gets_addressToCollateralDeposited(address, ADDRESS_1);
        const res4 = await contract.gets_addressToCollateralDeposited(address, LINK_ADDRESS);
        const res5 = await contract.getUserCollateralTokens(address)

        // console.log("RESPONSE", res5);
        
        setData5(res5)
        

        const weiBal = ethers.formatEther(res3);
        const weiBal2 = ethers.formatEther(res4);

        // Calculate total value based on external factors
        const totalValue = ((Number(weiBal) * 2500) + (Number(weiBal2) * 11)).toFixed(3);

        setData(res);
        setData2(res2);
        setData3(Number(weiBal));
        setData4(Number(weiBal2));
        setCollateralVal(totalValue);

      } catch (err) {
        console.error("Error fetching user data:", err);
        setData(null);
        setData2(null);
        setData3(null);
        setData4(null);
        setCollateralVal(null);
      }
    };

    fetchUserStatus();
  }, [address]); 
  
  return { data, data2, data3, data4, collateralVal, data5 };
};

export default useGetValueAndHealth;
