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
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { DataTable } from "./DataTable";
import columns from "./TableColumnDef";
import TransactionsGraph from "../transaction-graph/TransactionsGraph";
import { tinybarToHbarConvert } from "@/utils/tinybarToHbar";
import { timestampToDate } from "@/utils/dateStampConvert";
import useAccountId from "../../../hooks/useAccountId";

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
  const { selectedAccountId, updateAccountIdSelection } = useAccountId();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FieldValues>({
    defaultValues: {
      accountId: selectedAccountId,
    },
  });

  // Checks updates the network value for the selected network
  const getApiUrlForNetwork = (network: string) => {
    switch (network) {
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
  async function fetchTransactions(url: string) {
    try {
      const response = await fetch(url);

      if (!response.ok) {
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
  /*
        Search transactions from an account and iterate through all the 
        next Link property.
    */
  const searchTransactions = async (accountId: string) => {
    setIsLoading(true);

    try {
      const newAccountId = updateAccountIdSelection(accountId);
      let nextLink = `${networkUrl}/api/v1/transactions?limit=1000&order=desc&account.id=${encodeURIComponent(
        accountId
      )}`;
      // First fetch of transactions
      const transactionsAndLinks = await fetchTransactions(nextLink);
      const fetchedTransactions = transactionsAndLinks.transactions;

      // Automatically sets account id into the input if it exists
      if(newAccountId !== undefined){
        setValue("accountId", newAccountId);
      }
      // If there are more links, set the next link value
      if (transactionsAndLinks.links.next !== null) {
        nextLink = transactionsAndLinks.links.next;
      } else nextLink = "";

      // If next link has a value keep fetching transactions
      while (nextLink !== "") {
        const newTransactions = await fetchTransactions(nextLink);
        fetchedTransactions.push(...transactionsAndLinks.transactions);
        if (newTransactions.links.next !== null) {
          nextLink = newTransactions.link.next;
        } else nextLink = "";
      }
      /* 
                Maps the transactions into the Transaction interface
                Converts values into readable formats
                Generates a transfer string using logic to filter who initiates
                the transaction, to whom and what amount
            */
      const modifiedTransactions = fetchedTransactions.map(
        (transaction: Transaction) => ({
          ...transaction,
          charged_tx_fee: tinybarToHbarConvert(transaction.charged_tx_fee),
          consensus_timestamp: timestampToDate(transaction.consensus_timestamp),
          transfersString: `From account: ${
            transaction.transaction_id.split("-")[0]
          },
                        Amount: ${tinybarToHbarConvert(
                          transaction.transfers.find(
                            (transfer) =>
                              transfer.amount ===
                              transaction.transfers.reduce(
                                (max, transfer) =>
                                  transfer.amount > max ? transfer.amount : max,
                                0
                              )
                          )?.amount
                        )} Hbar to account: ${
            transaction.transfers.find(
              (transfer) =>
                transfer.amount ===
                transaction.transfers.reduce(
                  (max, transfer) =>
                    transfer.amount > max ? transfer.amount : max,
                  0
                )
            )?.account
          }`,
        })
      );
      // Adds the modified transactions to the transaction list
      setTransactions(modifiedTransactions);
      setLinks(links);
      console.log("Transactions: ", modifiedTransactions);
      console.log("Link: ", links);
    } catch (error) {
      // TODO improve error logging
      console.log("Error searching transactions ", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Submits and searches the account id transactions
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    await searchTransactions(data.accountId);
  };

  // If there is an account in session storage, use it to automatically search transactions
  useEffect(() => {
    const storedAccountId = sessionStorage.getItem("selectedAccountId");
    if(storedAccountId) {
      searchTransactions(storedAccountId);
      setValue("accountId", storedAccountId);
    }
  }, [])

  return (
    <>
      <Card
        className="
            bg-greyBase-200
            rounded-xl
            shadow-[0_2px_2px]
            shadow-brand-800
            items-center
            min-w-[300px]
        "
      >
        <CardHeader className="text-center">
          <CardTitle className="text-2xl md:text-3xl lg:text-4xl">
            Hedera Transaction Explorer
          </CardTitle>
          <CardDescription className="text-xs md:text-sm text-center text-greyCool-600">
            Input the Hedera account that you want to search
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Wrap>
            <div>
              <Label htmlFor="accountId">Account ID:</Label>
              <Input
                id="accountId"
                type="string"
                placeholder="0.0.XXXX"
                disabled={isLoading}
                {...register("accountId")}
              />
            </div>
            <div>
              <Button onClick={handleSubmit(onSubmit)}>
                {isLoading ? "Loading" : "Search"}
            </Button>
            </div>
          </Wrap>
        </CardContent>
        <div>
          <CardFooter>
            {transactions.length > 0 && (
              <DataTable columns={columns} data={transactions} />
            )}
          </CardFooter>
        </div>
      </Card>
      {transactions.length > 0 && <TransactionsGraph data={transactions}/>}
    </>
  );
};

export default TransferLookUp;
