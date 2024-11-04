import { USDC_ADDRESS, USDC_ADDRESS_ARB,USDC_ADDRESS_OP } from "./addresses";

// Sample token data for Base Sepolia
export const tokenData = [
    {
        token: "ETH",
        icon: "/eth.svg",
        tokenPrice: 2500, // Hardcoded price
        address: "",
    },
    // {
    //     token: "LINK",
    //     icon: "/link.svg",
    //     tokenPrice: 11, // Hardcoded price
    //     address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410", 
    // },
    {
      token: "USDC",
      icon: "/USDC.svg",
      tokenPrice: 1,
      address: USDC_ADDRESS,  
    },
];
