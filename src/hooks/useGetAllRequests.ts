'use client';
import { getLendbitContract } from '@/config/contracts';
import { readOnlyProvider } from '@/config/provider';
import { Request } from '@/constants/types';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const useGetAllRequests = () => {
    const [requests, setRequests] = useState<{
        loading: boolean;
        data: Request[] | undefined;
    }>({
        loading: true,
        data: [],
    });

    useEffect(() => {
        (async () => {
            const contract = getLendbitContract(readOnlyProvider);
            let _index = 1;
            const fetchedRequests: Request[] = [];

            while (true) {
                try {
                    const _request = await contract.getRequest(_index);
                    
                    // Check if a valid request is fetched
                    if (_request[0] !== 0) {  
                        const structuredRequest: Request = {
                            requestId: Number(_request[0]),
                            author: _request[1],
                            amount: String(ethers.formatEther(_request[2].toString())),
                            interest: Number(_request[3]),
                            totalRepayment: String(ethers.formatEther(_request[4].toString())),
                            returnDate: Number(_request[5]),
                            lender: _request[6],
                            loanRequestAddr: _request[7],
                            status: _request[8] == 0 ? 'OPEN' : _request[8] == 1 ? 'SERVICED' : 'CLOSED',
                        };

                        fetchedRequests.push(structuredRequest);
                    } else {
                        break; 
                    }
                    _index += 1;
                } catch (error) {
                    console.error("Error fetching requests:", error);
                    setRequests((prev) => ({ ...prev, loading: false }));
                    break;
                }
            }
            
            // Set the fetched requests and update loading state
            setRequests({
                loading: false,
                data: fetchedRequests,
            });
        })();
    }, []);

    return {loading:requests.loading, requestData: requests.data};
};

export default useGetAllRequests;
