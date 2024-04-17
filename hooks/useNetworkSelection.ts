import { useState } from "react";

const useNetworkSelection = () => {
    /* 
        Checks if the window exists and if there is already an item in sessionStorage
        with the name selectedNetwork
    */
    const [selectedNetwork, setSelectedNetwork] = useState<string>(() => {
        if (typeof window !== 'undefined' && sessionStorage.getItem('selectedNetwork')){
            return sessionStorage.getItem('selectedNetwork') || '';
        } else return 'mainnet';
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
