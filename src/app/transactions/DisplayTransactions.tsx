"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { tinybarToHbarConvert } from "@/utils/tinybarToHbar";
import { useEffect, useState } from "react";

// Transfer interface
interface Transfer {
  account: string;
  amount: number;
  is_approval: boolean;
}

// Transaction interface
interface Transaction {
  transaction_id: string;
  name: string;
  transfers: Transfer[];
  consensus_timestamp: string;
  node: string;
  result: string;
  charged_tx_fee: number;
  transaction_hash: string;
  scheduled: boolean;
}

/*
    This component gets the transaction data, sorts throught it and then displays it 
    in an orderly fashion using a table display from tailwind.
    It iterates and orders it all using logic to format the data correctly
*/
const DisplayTransaction = () => {
  const [transactionData, setTransactionData] = useState([]);

  // Recover the transactions from session storage
  useEffect(() => {
    const storedTransactionData = sessionStorage.getItem("transactions");

    if (storedTransactionData) {
      const storedData = JSON.parse(storedTransactionData);

      setTransactionData(storedData);

      if (transactionData.length === 0) {
        // TODO add logic in order to retrieve from URL
      }
    }
  }, []);

  return (
    <>
      {/* Displays the card and the orderly transactions */}
      {transactionData.map((transaction: Transaction, index) => (
        <Card
          key={index}
          className="
                        bg-slate-200 
                        rounded-xl 
                        shadow-[0_2px_2px] 
                        shadow-cyan-500 
                        text-slate-700 
                        items-center 
                        min-w-[300px] 
                        mb-5"
        >
          <CardHeader className="items-center text-center">
            <CardTitle className="text-xl md:text-2xl lg:text-3xl">
              Transaction ID
            </CardTitle>
          </CardHeader>
          <CardDescription className="font-bold text-xl text-center mb-2">
            {transaction.transaction_id}
          </CardDescription>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 font-semibold text-md">
              {/* Displays node, status, date and type of transaction in colomns */}
              <div className="items-center">
                <div className="grid grid-cols-3">
                  <div className="mr-20">Node:</div>
                  <div>{transaction.node}</div>
                </div>
              </div>
              <div className="items-center">
                <div className="grid grid-cols-3">
                  <div className="mr-20">Status:</div>
                  <div>{transaction.result}</div>
                </div>
              </div>
              <div className="items-center">
                <div className="grid grid-cols-3">
                  <div className="mr-20">Date:</div>
                  <div>{transaction.consensus_timestamp}</div>
                </div>
              </div>
              <div className="items-center">
                <div className="grid grid-cols-3">
                  <div className="mr-20">Type:</div>
                  <div>{transaction.name}</div>
                </div>
              </div>
              {/* Displays the Transfers for the transaction */}
              <div className="flex flex-col">
                <div className="grid grid-cols-5">
                  <div className="col-span-5">Transfers:</div>
                  <table className="col-span-5 text-left ml-3">
                    <thead>
                      <tr>
                        <th>Account</th>
                        <th>Amount</th>
                        <th>Account(s)</th>
                        <th>Amount</th>
                        <th>Information</th>
                      </tr>
                    </thead>
                    <tbody className="font-normal">
                      <tr>
                        {/* Gets the account who initiates the transaction by splitting the transfer id */}
                        <td>{transaction.transaction_id.split("-")[0]}</td>
                        {/* Finds the account which initiates the transaction */}
                        <td>
                          {tinybarToHbarConvert(
                            transaction.transfers.find(
                              (transfer) =>
                                transfer.account ===
                                transaction.transaction_id.split("-")[0]
                            )?.amount
                          )}
                        </td>
                        {/* Gets the destination account, the one who recieved the most */}
                        <td>
                          {
                            transaction.transfers.find(
                              (transfer) =>
                                transfer.amount ===
                                transaction.transfers.reduce(
                                  (max, transfer) =>
                                    transfer.amount > max
                                      ? transfer.amount
                                      : max,
                                  0
                                )
                            )?.account
                          }
                        </td>
                        {/* Shows the amount the recipient recieved */}
                        <td>
                          {tinybarToHbarConvert(
                            transaction.transfers.find(
                              (transfer) =>
                                transfer.amount ===
                                transaction.transfers.reduce(
                                  (max, transfer) =>
                                    transfer.amount > max
                                      ? transfer.amount
                                      : max,
                                  0
                                )
                            )?.amount
                          )}
                        </td>
                        <td className="text-sm">Transaction Reciever</td>
                      </tr>
                      {transaction.transfers
                        .filter(
                          (transfer) =>
                            transfer.amount !==
                              transaction.transfers.reduce(
                                (max, transfer) =>
                                  transfer.amount > max ? transfer.amount : max,
                                0
                              ) &&
                            transfer.account !==
                              transaction.transaction_id.split("-")[0]
                        )
                        .map((transfer, transferIndex) => {
                          // TODO move this to another helper function?
                          let isNodeTransaction: boolean = false;
                          let isNetworkFee: boolean = false;
                          let accountTransfer: string | undefined =
                            transfer.account.split(".").pop();
                          if (accountTransfer) {
                            isNodeTransaction =
                              parseInt(accountTransfer, 10) <= 99;
                            isNetworkFee = parseInt(accountTransfer, 10) > 99;
                          }
                          let lastColumnText = "";
                          if (isNodeTransaction) {
                            lastColumnText = "Node Fee";
                          } else if (isNetworkFee) {
                            lastColumnText = "Network Fee";
                          }
                          return (
                            <tr key={transferIndex}>
                              <td></td>
                              <td></td>
                              <td>{transfer.account}</td>
                              <td>{tinybarToHbarConvert(transfer.amount)}</td>
                              <td>{lastColumnText}</td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Shows the transaction fees */}
              <div className="flex flex-col">
                    <div className="grid grid-cols-3">
                        <div className="mt-4 col-span-3 mb-2">Fees:</div>
                        <div className="mt-4">Sender:</div>
                        <div className="col-span-2">
                            {transaction.transaction_id.split("-")[0]}
                        </div>
                        <div className="ml-4">Transaction fees:</div>
                        <div className="col-span-2">
                            {transaction.charged_tx_fee} hbar
                        </div>
                        <div className="ml-4">Scheduled:</div>
                        <div className="col-span-2">
                            {transaction.scheduled.toString()}
                        </div>
                    </div>
              </div>
            </div>
          </CardContent>
          <div>
            <CardFooter className="font-semibold text-md grid -grid-cols-4">
                <div>Transaction Hash:</div>
                <div>{transaction.transaction_hash}</div>
            </CardFooter>
          </div>
        </Card>
      ))}
    </>
  );
};

export default DisplayTransaction;
