import { useEffect, useState } from "react";

const useNetworkSelection = () => {
  /* 
        Checks if there is already an item in sessionStorage
        with the name selectedNetwork
    */
  const [selectedNetwork, setSelectedNetwork] = useState<string>("mainnet");

  useEffect(() => {
    const storedNetwork = sessionStorage.getItem("selectedNetwork");
    if (storedNetwork) {
      setSelectedNetwork(storedNetwork);
    }
  }, []);

  // Sets the stored network to the new network value
  const updateNetworkSelection = (network: string) => {
    setSelectedNetwork(network);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("selectedNetwork", network);
    }
  };

  return { selectedNetwork, updateNetworkSelection };
};

export default useNetworkSelection;
