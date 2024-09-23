import Balance from "@/components/dashboard/Balance";
import Collateral from "@/components/dashboard/Collateral";
import DashboardCard from "@/components/dashboard/DashboardCard";
import Usage from "@/components/dashboard/Usage";
import { battryCSS } from "@/constants/utils/batteryCSS";
import Image from "next/image";



export default function DashboardPage() {
    return (
        <main className="w-full">
            <h3 className="mb-8 text-sm">Welcome, [User].</h3>

            <div className="mx-1">
                <div className="flex justify-between items-center w-full mb-14">
                    <DashboardCard
                        text={"Your Portfolio"}
                        figure={"$19,022.44"}
                        extraCSS = {{
                            boxShadow: '0 0 10px 5px rgba(255, 0, 0, 0.25)',
                        }}
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
                        extraCSS = {{
                            boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.1)',
                        }}
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
                        extraCSS = {{
                            boxShadow: '0 0 15px 5px rgba(255, 255, 255, 0.25)',
                        }}
                        icon={
                            <div className='bg-white/80 shadow shadow-[#C2C2C21A] w-[24.6px] h-11 pt-1 px-[0.6px] flex place-items-end'>
                                <div className={`${battryCSS(3.7)} w-full`}></div>
                            </div>
                        }
                    />
                </div>

                <div className="flex justify-between w-full">
                    <div className="w-1/2 flex flex-col gap-10">
                        <div>
                            <Balance />
                        </div>
                        <div>
                            <Collateral />
                        </div>
                    </div>


                    <div className="w-1/2">
                        <div className="w-4/5 float-right">
                            <Usage />
                        </div>
                    </div>
                </div>    
            </div>
        </main>
    )
}

