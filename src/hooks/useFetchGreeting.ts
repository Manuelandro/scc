import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export default function useFetchGreeting(): any {
    const [fetching, setFetching] = useState(false)

    // call the smart contract, read the current greeting value
    useEffect(() => {
        if (!fetching || typeof window.ethereum === 'undefined') {
            setFetching(false)
            return
        }

        ;(async function() {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const contract = new ethers.Contract(contractAddress, Greeter.abi, provider)
            try {
                const data = await contract.greet()
                console.log('data: ', data)
            } catch (err) {
                console.log("Error: ", err)
            } finally {
                setFetching(false)
            }

        })()
    }, [fetching])

    return [setFetching]
}