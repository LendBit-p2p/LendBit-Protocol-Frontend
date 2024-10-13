'use client';
import { getLendbitContract } from '@/config/contracts';
import { readOnlyProvider } from '@/config/provider';
import { LoanListing } from '@/constants/types';
import { useEffect, useState } from 'react';



const useGetAllListings = () => {
    const [listings, setListings] = useState<LoanListing[]>([]);

    useEffect(() => {
        (async () => {
            const contract = getLendbitContract(readOnlyProvider);
            let _index = 1;
            const fetchedListings: LoanListing[] = [];

            while (true) {
                try {
                    const _listing = await contract.getLoanListing(_index);

                    if (_listing[0] !== 0) {  // Assuming listingId is at index 0
                        // console.log("AAAAAxxxxxxxx", _listing);
                        
                        const structuredListing: LoanListing = {
                            listingId: Number(_listing[0]),
                            author: _listing[1],
                            tokenAddress: _listing[2],
                            amount: _listing[3].toString(),
                            min_amount: _listing[4].toString(),
                            max_amount: _listing[5].toString(),
                            returnDate: Number(_listing[6]),
                            interest: Number(_listing[7]),
                            listingStatus: _listing[8] == 0 ? 'OPEN' : 'CLOSED', // Assuming status is an enum
                        };

                        // Append structured listing to the array
                        fetchedListings.push(structuredListing);
                    } else {
                        break; // Exit loop if no more listings are available
                    }
                    _index += 1;
                } catch (error) {
                    console.error("Error fetching listings:", error);
                    break;
                }
            }
// console.log("AAAAAAAAAAAAAA", fetchedListings);
            // Update state with the structured listings
            setListings(fetchedListings);
        })();
    }, []);

    return listings;
};

export default useGetAllListings;
