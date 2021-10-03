import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

export default function useSetGreeting(setFetching: React.Dispatch<boolean>): any {
    const [greeting, setGreeting] = useState()
    const [setting, setSetting] = useState(false)



   // call the smart contract, send an update
   useEffect(() => {
    if (!setting || !greeting || typeof window.ethereum === 'undefined') {
        setSetting(false)
        return
    }

   ;(async function() {
      try {
        // request access to the user's MetaMask account
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, Greeter.abi, signer)
        const transaction = await contract.setGreeting(greeting)
        await transaction.wait()
        setFetching(true)
      } catch (err) {
        console.log(err)
      } finally {
        setSetting(false)
      }

    })()
}, [setting, greeting])


return [setSetting, setGreeting]

}