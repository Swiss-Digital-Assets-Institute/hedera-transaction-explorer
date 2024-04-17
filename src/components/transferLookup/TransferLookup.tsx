"use client";

import Wrap from "../Wrap";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import useNetworkSelection from "../../../hooks/useNetworkSelection";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form"

// Interface for a single transfer inside a transaction
interface Transfer {
    account: string;
    amount: number;
    is_approval: boolean;
}

// Interface for a single Transaction
interface Transaction {
    transaction_id: string;
    name: string;
    transfers: Transfer[];
    consensus_timestamp: string;
    node: string;
    result: string;
    charged_tx_fee: number;
    transaction_hash: string;
}

const TransferLookUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [links, setLinks] = useState([]);
    const { selectedNetwork } = useNetworkSelection();
    // TODO add a hook to save the accountId same as network selection
    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
    } = useForm<FieldValues>({
        defaultValues: {
            accountId: "",
        }
    });

    // Checks updates the network value for the selected network
    const getApiUrlForNetwork = (network: string) => {
        switch(network){
            case "mainnet":
                return process.env.NEXT_PUBLIC_MAINNET;
            case "testnet":
                return process.env.NEXT_PUBLIC_TESTNET;
            case "previewnet":
                return process.env.NEXT_PUBLIC_PREVIEWNET;
            default:
                // TODO add error logging
                throw new Error(`Select a Network: ${network}`);
        }
    };

    const networkUrl = getApiUrlForNetwork(selectedNetwork);
    /* 
        Fetches the transactions based on an URL which is passed
        handles errors if bad request and if unexpected error
        returns data which has the Transaction interface model
    */
    async function fetchTransactions(url:string) {
        try {
            const response = await fetch(url);

            if(!response.ok){
                // TODO improve error logging
                throw new Error(
                    `Failed to fetch transactions. Status: ${response.status}`
                );
            }

            const data = await response.json();
            console.log(data);
            return data || [];
        } catch (error) {
            // TODO improve error logging
            console.error("Error fetching transactions: ", error);
            throw error;
        }
    }

  return (
    <>
      <Card
        className="
            bg-slate-200
            rounded-xl
            shadow-[0_2px_2px]
            shadow-cyan-500
            text-slate-700
            items-center
            min-w-[300px]
        "
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl lg:text-4xl">
            Hedera Transaction Explorer
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-center text-slate-600">
            Input the Hedera account that you want to search
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Wrap>
            <div>
              <Label htmlFor="accountId">Account ID:</Label>
              <Input type="string" placeholder="0.0.XXXX" />
            </div>
            <div>
              <Button>Search</Button>
            </div>
          </Wrap>
        </CardContent>
        <div>
          <CardFooter>
            {/* TODO add the table here */}
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default TransferLookUp;
