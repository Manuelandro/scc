import React, { useState, useEffect, useRef } from 'react'
import { ethers } from 'ethers'
import Greeter from '../artifacts/contracts/Greeter.sol/Greeter.json'
const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

type  ReturnTypes = [React.Dispatch<boolean>, React.Dispatch<string>]

export default function useSetGreeting(setFetching: React.Dispatch<boolean>): ReturnTypes {
    const ismounted = useRef(true)
    const [greeting, setGreeting] = useState('')
    const [setting, setSetting] = useState(false)

    // ensure component is mounted when call useState's method in async functions
    useEffect(() => {
      return () => {
          ismounted.current = false
      }
    })
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
        if (ismounted.current) setFetching(true)
      } catch (err) {
        console.log(err)
      } finally {
        if (ismounted.current) setSetting(false)
      }

    })()
}, [setting, greeting])


return [setSetting, setGreeting]

}