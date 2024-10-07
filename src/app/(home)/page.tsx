import Image from "next/image";
import Balance from "@/components/dashboard/Balance";
import Collateral from "@/components/dashboard/Collateral";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Usage from "@/components/dashboard/Usage";
import { battryCSS } from "@/constants/utils/batteryCSS";

export default function DashboardPage() {
    return (
        <main className="max-w-[1190px] mx-auto p-4">
            <div className="w-full">
                <h3 className="mb-4 text-xl">Welcome, [User].</h3>

                {/* Top section: Dashboard Cards */}
                <div className="flex flex-wrap gap-4 mb-14">
                    <DashboardCard
                        text={"Your Portfolio"}
                        figure={"$19,022.44"}
                        extraCSS="portfolio-card"  // Add extraCSS for customization
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
                        extraCSS="profit-card"  // Add extraCSS for customization
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
                        figure={3.7}
                        extraCSS="health-card"  // Add extraCSS for customization
                        icon={
                            <div className='bg-white/80 shadow shadow-[#C2C2C21A] w-[24.6px] h-11 pt-1 px-[0.6px] flex place-items-end'>
                                <div className={`${battryCSS(3.7)} w-full`}></div>
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
