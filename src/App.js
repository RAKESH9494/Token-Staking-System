import React, { useEffect, useState } from 'react'
import abi from './artifacts/contracts/Defi.sol/Defi.json';
import Home from "./Components/Home"
import { Web3Provider } from "@ethersproject/providers";
import { ethers } from 'ethers'
const App = () => {
  const [contract ,setContract] = useState();
  const [Account,setAccount] = useState();
  useEffect(()=>{
    const connectWallet = async(e)=>{
      const contractAddress = "0x608b58317523B3712916aCfBCd62464bD2412298";
      const contractABI =abi.abi;
    try{
      const {ethereum} = window;
      if(ethereum){
        const account = await ethereum.request({method : "eth_requestAccounts",});
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        })
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress,contractABI,signer);
        setContract(contract);
        setAccount(account[0]);
        console.log(account);
      }else{
        alert("Please install metamask");
      }
    }catch(e){
      console.log(e);
    }}
  connectWallet();
  },[])
  return (
    <div>
      <Home contract={contract} account={Account}/>
    </div>
  )
}

export default (App)
