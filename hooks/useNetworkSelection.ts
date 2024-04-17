import { useState } from "react";

const useNetworkSelection = () => {
    /* 
        Checks if there is already an item in sessionStorage
        with the name selectedNetwork
    */
   // TODO fix reference error for sessionStorage with useEffect / provide default answer
    const [selectedNetwork, setSelectedNetwork] = useState<string>(() => {
        if (sessionStorage.getItem('selectedNetwork')){
            return sessionStorage.getItem('selectedNetwork') || '';
        } else {
            return 'mainnet';
        }
    })

    // Sets the stored network to the new network value
    const updateNetworkSelection = (network: string) => {
        setSelectedNetwork(network)
        if (typeof window !== 'undefined'){
            sessionStorage.setItem('selectedNetwork', network);
        }
    }

    return { selectedNetwork, updateNetworkSelection }
}

export default useNetworkSelection
