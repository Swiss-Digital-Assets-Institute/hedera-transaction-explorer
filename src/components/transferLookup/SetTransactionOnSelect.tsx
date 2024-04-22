"use client";

import Link from "next/link";
import useTransactionsSelection from "../../../hooks/useTransactionSelection";
import { Button } from "../ui/button";

interface SetTransactionsOnSelectProps {
  rowsSelected: number;
  rowTransactions: any;
}

const SetTransactionsOnSelect: React.FC<SetTransactionsOnSelectProps> = ({
  rowsSelected,
  rowTransactions,
}) => {
  const { updateTransactions } = useTransactionsSelection();

  const handleSeeTransactionsClick = () => {
    updateTransactions(rowTransactions);
  };

  return (
    <div>
      <Button
        className="bg-cyan-600 hover:bg-cyan-500"
        disabled={rowsSelected === 0}
        onClick={handleSeeTransactionsClick}
      >
        {/* TODO add dynamic URL generation */}
        <Link href="/transactions">See transactions</Link>
      </Button>
    </div>
  );
};

export default SetTransactionsOnSelect;
