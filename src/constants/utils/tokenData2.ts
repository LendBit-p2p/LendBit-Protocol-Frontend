import { ZeroAddress } from "ethers";

// Sample token data for Base Sepolia
export const tokenData2 = [
    {
        token: "ETH",
        icon: "/eth.svg",
        tokenPrice: 2500, // Hardcoded price
        address: "", // ETH does not have a contract address
    },
    {
        token: "LINK",
        icon: "/link.svg",
        tokenPrice: 11,
        address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
    },
    {
      token: "USDC",
      icon: "/USDC.svg",
      tokenPrice: 1,
      address: ZeroAddress,  
    },
    {
      token: "USDT",
      icon: "/usdt.svg",
      tokenPrice: "1",
      address: ZeroAddress,
    },
    {
      token: "DAI",
      icon: "/dai.svg",
      tokenPrice: "1",
      address: ZeroAddress,
    },
];
