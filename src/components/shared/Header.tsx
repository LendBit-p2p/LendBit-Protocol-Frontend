import Image from "next/image";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="bg-black p-6 w-full top-0 left-0 relative custom-corner-header">
            <div className="flex justify-between items-center w-full">
                <Link href={"/"} className="flex items-center gap-[6px]">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={50}
                        height={42}
                        priority
                        quality={100}
                    />
                    <Image
                        src="/white-word.png"
                        alt="brand text"
                        width={92}
                        height={20}
                        priority
                        quality={100}
                    />
                </Link>

                <nav className="space-x-6 text-sm font-medium">
                    <Link href="/dashboard" className="">
                        Dashboard
                    </Link>
                    <Link href="/order" className="">
                        Orders
                    </Link>
                    <Link href="/marketplace" className="">
                        Marketplace
                    </Link>
                </nav>

                <div>
                    icons
                </div>
            </div>
        </header>
    );
};
