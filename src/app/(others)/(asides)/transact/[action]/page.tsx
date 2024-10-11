"use client";

import AssetSelector from "@/components/shared/AssetSelector";
import { Btn } from "@/components/shared/Btn";
import PleaseConnect from "@/components/shared/PleaseConnect";
import useDepositCollateral from "@/hooks/useDepositCollateral";
import { Spinner } from "@radix-ui/themes";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function TransactPage({ params }: { params: { action: string } }) {
  const actionText = params.action === "deposit" ? "Deposit" : "Withdraw";
  const [assetValue, setAssetValue] = useState("0.00");
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const { address, isConnected } = useWeb3ModalAccount();
  const [isClient, setIsClient] = useState(false);

  // const depositFx = useDepositCollateral()

  useEffect(() => {
    setIsClient(true);
  }, []);


  useEffect(() => {
    if (isConnected && address) {
      setUserAddress(address);
    } else {
      setUserAddress(null);
    }
  }, [address, isConnected]);


  if (!isClient) {
    return (
      <div className="text-[#FF4D00] flex justify-center my-64">
        <Spinner size={"3"} />
      </div>
    );
  }


  if (!isConnected) {
    return <PleaseConnect />;
  }

  const handleTokenSelect = (token: string, price: number) => {
    // Handle token selection logic here if necessary
  };

  const handleAssetValueChange = (value: string) => {
    setAssetValue(value);
  };

  return (
    <div className="h-screen flex items-center">
      <div className="bg-black rounded-md p-2 u-class-shadow">
        <p className="text-base text-white pl-2">{actionText}</p>

        <AssetSelector
          onTokenSelect={handleTokenSelect}
          onAssetValueChange={handleAssetValueChange}
          assetValue={assetValue}
          userAddress={userAddress}
        />

        <div>
          <Link href={"/successful"} className="mt-4 px-4 cursor-pointer">
            <Btn
              text={actionText}
              css="text-black bg-[#FF4D00CC]/80 text-base w-full py-2 rounded flex items-center justify-center"
            />
          </Link>
          <Link href={"/"} className="px-4 cursor-pointer -mt-36">
            <Btn
              text={"Cancel"}
              css="text-black bg-[#a2a8b4]/80 text-base w-full py-2 rounded flex items-center justify-center"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
