"use client";

import Image from "next/image";
import Balance from "@/components/dashboard/Balance";
import Collateral from "@/components/dashboard/Collateral";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Usage from "@/components/dashboard/Usage";
import useGetValueAndHealth from "@/hooks/useGetValueAndHealth";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { formatAddress } from "@/constants/utils/formatAddress";
import { useEffect, useState } from "react";
import { getBasename } from '@superdevfavour/basename'; // Import basename package

export default function DashboardPage() {
  const [user, setUser] = useState("User");
  const { data, data2 } = useGetValueAndHealth();
  const { address, isConnected, chainId } = useWeb3ModalAccount();

  const getFirstDigit = (bigNumber: bigint) => {
    const bigNumberString = bigNumber.toString();
    const firstDigit = parseInt(bigNumberString[0], 10);
    return firstDigit;
  };

  const healthFactor = data2 ? getFirstDigit(data2) : 0;

  useEffect(() => {
    const fetchBasename = async () => {
      if (isConnected && address) {
        try {
          const basename = await getBasename(address);
          if (basename) {
            setUser(basename); // Set user to basename if available
          } else {
            const formattedAddress = formatAddress(address);
            setUser(formattedAddress); // Fallback to formatted address
          }
        } catch (error) {
          console.error("Error fetching basename:", error);
          const formattedAddress = formatAddress(address);
          setUser(formattedAddress); // Fallback to formatted address on error
        }
      }
    };

    fetchBasename();
  }, [isConnected, address]); // Only run when isConnected or address changes

  return (
    <main className="max-w-[1190px] mx-auto p-4">
      <div className="w-full">
        <h3 className="mb-4 text-xl">
          {`Welcome, `}
          <span className="text-[#DD4F00]">{user}</span>
        </h3>


        {/* Top section: Dashboard Cards */}
        <div className="flex flex-wrap gap-4 mb-14">
          <DashboardCard
            text={"Your Portfolio"}
            figure={`$${data ? Number(data) : 0}`}
            extraCSS="portfolio-card" // Add extraCSS for customization
            icon={
              <Image
                src="/dollar.png"
                alt="logo"
                width={42}
                height={42}
                priority
                quality={100}
              />
            }
          />

          <DashboardCard
            text={"Net Profit"}
            figure={"14.7%"}
            extraCSS="profit-card" // Add extraCSS for customization
            icon={
              <Image
                src="/percentage.png"
                alt="logo"
                width={42}
                height={42}
                priority
                quality={100}
              />
            }
          />

          <DashboardCard
            text={"Health Factor "}
            figure={healthFactor}
            extraCSS="health-card" // Add extraCSS for customization
            icon={
              <div className="bg-white/80 shadow shadow-[#C2C2C21A] w-[24.6px] h-11 pt-1 px-[0.6px] flex place-items-end">
                <div className={`${battryCSS(healthFactor)} w-full`}></div>
              </div>
            }
          />
        </div>

        {/* Bottom section: Two halves */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left half: Balance and Collateral stacked */}
          <div className="flex flex-col gap-5">
            <Balance />
            <Collateral />
          </div>

          {/* Right half: Usage alone */}
          <div className="w-full">
            <Usage />
          </div>
        </div>
      </div>
    </main>
  );
}

const battryCSS = (figure: number | string) => {
  const value = typeof figure === 'string' ? parseFloat(figure) : figure;

  if (value > 1) {
    return 'above1 h-full';
  } else if (value == 1) {
    return 'btw051_099 h-6';
  } else if (value >= 0.51) {
    return 'below03 h-3';
  } else if (value > 0.29) {
    return 'below03 h-2';
  } else {
    return 'below03 h-1';
  }
};
