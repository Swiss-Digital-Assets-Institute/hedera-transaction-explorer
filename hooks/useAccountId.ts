import { useEffect, useState } from "react";

const useAccountId = () => {
  /*
        Checks if there is already an accountId in sessionStorage
    */

  const [selectedAccountId, setSelectedAccountId] = useState<string>("");

  useEffect(() => {
    const storedAccountId = sessionStorage.getItem("selectedAccountId");
    if (storedAccountId) {
      setSelectedAccountId(storedAccountId);
    }
  }, []);

  // Sets the stored accountId to new value
  const updateAccountIdSelection = (accountId: string) => {
    setSelectedAccountId(accountId);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedAccountId", accountId);
    }
  };

  return { selectedAccountId, updateAccountIdSelection };
};

export default useAccountId;
