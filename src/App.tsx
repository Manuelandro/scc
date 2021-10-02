import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers'
import Greeter from './artifacts/contracts/Greeter.sol/Greeter.json'
import './App.css';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3'

const App: React.FC = () => {
  const [greeting, setGreeting] = useState()
  const [fetching, setFetching] = useState(false)

  // request access to the user's MetaMask account
  async function requestAccount(): void {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  // call the smart contract, read the current greeting value
  useEffect(() => {
    if (!fetching) return
    ;(async function() {
      if (typeof window.ethereum !== 'undefined') {
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
      }
    })()
  }, [fetching])

   // call the smart contract, send an update
   useEffect(() => {

     ;(async function() {
       if (!greeting) return
       if (typeof window.ethereum !== 'undefined') {
         await requestAccount()
         const provider = new ethers.providers.Web3Provider(window.ethereum);
         const signer = provider.getSigner()
         const contract = new ethers.Contract(contractAddress, Greeter.abi, signer)
         const transaction = await contract.setGreeting(greeting)
         await transaction.wait()
         fetchGreeting()
        }
      })()
  }

  return (
    <div className="App">

    </div>
  );
}

export default App;
