'use client';
import { getLendbitContract } from '@/config/contracts';
import { readOnlyProvider } from '@/config/provider';
import { LoanListing } from '@/constants/types';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const useGetAllListings = () => {
    const [listings, setListings] = useState<{
        loadings: boolean;
        data: LoanListing[] | undefined;
    }>({
        loadings: true,
        data: [],
    });

    useEffect(() => {
        (async () => {
            const contract = getLendbitContract(readOnlyProvider);
            let _index = 1;
            const fetchedListings: LoanListing[] = [];

            while (true) {
                try {
                    const _listing = await contract.getLoanListing(_index);
                    
                    // Check if a valid listing is fetched
                    if (_listing[0] !== 0) {  
                        const structuredListing: LoanListing = {
                            listingId: Number(_listing[0]),
                            author: _listing[1],
                            tokenAddress: _listing[2],
                            amount: String(ethers.formatEther(_listing[3].toString())),
                            min_amount: String(ethers.formatEther(_listing[4].toString())),
                            max_amount: String(ethers.formatEther(_listing[5].toString())),
                            returnDate: Number(_listing[6]),
                            interest: Number(_listing[7]),
                            listingStatus: _listing[8] == 0 ? 'OPEN' : 'CLOSED',
                        };

                        fetchedListings.push(structuredListing);
                    } else {
                        break; 
                    }
                    _index += 1;
                } catch (error) {
                    console.error("Error fetching loan listings:", error);
                    setListings((prev) => ({ ...prev, loadings: false }));
                    break;
                }
            }
            
            // Set the fetched listings and update loading state
            setListings({
                loadings: false,
                data: fetchedListings,
            });
        })();
    }, []);

    return { loadings: listings.loadings, listingData: listings.data };
};

export default useGetAllListings;
