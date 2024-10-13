import { getLendbitContract } from "@/config/contracts";
import { readOnlyProvider } from "@/config/provider";
import { ADDRESS_1 } from "@/constants/utils/addresses";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { useEffect, useState } from "react";

const useGetCollaterals = () => {
   const [data, setData] = useState<any | null>(null);
  const { address } = useWeb3ModalAccount();


  useEffect(() => {
    const fetchUserStatus = async () => {
      try {
        const contract = getLendbitContract(readOnlyProvider);
        const res = await contract.gets_addressToCollateralDeposited(address, ADDRESS_1);
        console.log("DATA 4", data);
        
          setData(res);

      } catch (err) {
        console.error(err);
      }
    };

    if (address) {
      fetchUserStatus();
    }
  }, [address]);

  return data;
};

export default useGetCollaterals;
