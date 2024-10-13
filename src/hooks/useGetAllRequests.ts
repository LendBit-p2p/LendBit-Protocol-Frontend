'use client';
import { getLendbitContract } from '@/config/contracts';
import { readOnlyProvider } from '@/config/provider';
import { Request } from '@/constants/types';
import { useEffect, useState } from 'react';


const useGetAllRequests = () => {
    const [requests, setRequests] = useState<Request[]>([]);

    useEffect(() => {
        (async () => {
            const contract = getLendbitContract(readOnlyProvider);
            let _index = 1;
            const fetchedRequests: Request[] = [];

            while (true) {
                try {
                    const _request = await contract.getRequest(_index);
                    // console.log(_request);

                    if (_request[0] !== 0) {  
                        const structuredRequest: Request = {
                            requestId: Number(_request[0]),
                            author: _request[1],
                            amount: _request[2].toString(),
                            interest: Number(_request[3]),
                            totalRepayment: _request[4].toString(),
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
                    break;
                }
            }
            // console.log("AAAAAAAAAAAAAA", fetchedRequests);
            

            setRequests(fetchedRequests);
        })();
    }, []);

    return requests;
};

export default useGetAllRequests;
