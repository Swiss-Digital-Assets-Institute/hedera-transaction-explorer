"use client";

import { useRouter } from "next/navigation";
import useTransactionsSelection from "../../../hooks/useTransactionSelection";
import { Button } from "../ui/button";
import useNetworkSelection from "../../../hooks/useNetworkSelection";

// TODO create a different interface type and import it EVERY where it needs to be added
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
interface SetTransactionsOnSelectProps {
  rowsSelected: number;
  rowTransactions: Transaction[];
}

const SetTransactionsOnSelect: React.FC<SetTransactionsOnSelectProps> = ({
  rowsSelected,
  rowTransactions,
}) => {
  const { updateTransactions } = useTransactionsSelection();
  const { selectedNetwork } = useNetworkSelection();
  const router = useRouter();

  const handleSeeTransactionsClick = () => {
    updateTransactions(rowTransactions);

    const transactionIds = rowTransactions
      .map((transaction) => transaction.transaction_id)
      .join("&id=");
    const queryParams = `?selectedNetwork=${selectedNetwork}&id=${transactionIds}`
    router.push(`/transactions${queryParams}`);
  };

  return (
    <div>
      <Button
        className="bg-cyan-600 hover:bg-cyan-500"
        disabled={rowsSelected === 0}
        onClick={handleSeeTransactionsClick}
      >
        {/* TODO add dynamic URL generation */}
        See transactions
      </Button>
    </div>
  );
};

export default SetTransactionsOnSelect;
