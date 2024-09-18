import Image from "next/image";
import Link from "next/link";

export const Header = () => {
    return (
        <header className="bg-black text-white p-4 w-full top-0 left-0 relative custom-corner-header">
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-4">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={50}
                        height={50}
                        priority
                        quality={100}
                    />
                    <Image
                        src="/white-word.png"
                        alt="brand text"
                        width={120}
                        height={50}
                        priority
                        quality={100}
                    />
                </div>

                <nav className="space-x-6 text-sm">
                    <Link href="/dashboard" className="hover:underline">
                        Dashboard
                    </Link>
                    <Link href="/order" className="hover:underline">
                        Orders
                    </Link>
                    <Link href="/marketplace" className="hover:underline">
                        Marketplace
                    </Link>
                </nav>

                <div>
                    {/* Add additional elements like user profile, notifications, or more logos here */}
                    icons
                </div>
            </div>
        </header>
    );
};
