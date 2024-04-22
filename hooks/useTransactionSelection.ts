import { useState } from "react";

interface Transaction {
    bytes: any;
    charged_tx_fee: number;
    consensus_timestamp: string;
    entity_id: any;
    max_fee: string;
    memo_base64: string;
    name: string;
    nft_transfers: [{}];
    node: string;
    nonce: number;
    parent_consensus_timestamp: any;
    result: string;
    scheduled: boolean;
    stakin_reward_transfers: [{}];
    token_transfers: [{}];
    transaction_hash: string;
    transaction_id: string;
    transfers: [
        {
            account: string;
            amount: number;
            is_approval: boolean;
        }
    ];
    transfersString: string;
    valid_duration_seconds: string;
    valid_start_timestamp: string;
}

const useTransactionsSelection = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(()=> {
        if( typeof window !== "undefined" && sessionStorage.getItem("transactions")) {
            const storedTransactions = sessionStorage.getItem("transactions");
            return storedTransactions ? JSON.parse(storedTransactions) : [];
        } else {
            return [];
        }
    });

    const updateTransactions = (rowData: Transaction | Transaction[]) => {
        const newTransactions = Array.isArray(rowData)
            ? rowData
            : [...transactions, rowData];

        setTransactions(newTransactions);

        if(typeof window !== "undefined") {
            sessionStorage.setItem('transactions', JSON.stringify(newTransactions));
        }
    };

    return { transactions, updateTransactions}
};

export default useTransactionsSelection;
