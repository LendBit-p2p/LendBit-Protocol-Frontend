import MktIcons from "./MktIcons";

const MktHeader = () => {
  return (
    <header className="bg-black px-10 w-full border border-[#FF4D00] rounded-lg relative">
        <div className="flex justify-between w-full items-center">
            <div className="w-2/3 text-start">
            <h3 className="text-[40px]">Lendbit Marketplace</h3>
            <p className="text-[15px]">
                Explore a world of lending and borrowing possibilities—find the perfect match for your financial needs and let your assets work smarter for you.
            </p>
            </div>

            <div className="relative">
            <MktIcons />
            </div>
        </div>
    </header>
  );
};

export default MktHeader;
