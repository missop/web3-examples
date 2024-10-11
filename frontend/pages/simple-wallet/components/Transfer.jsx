import React, { useState } from "react";

import Loading from "./Loading";
import { ethers } from "ethers";
/**
 *
 * @param {{
 * walletProvider:import('ethers')['providers']['Web3Provider']
 * }} param0
 * @returns
 */
export default function Transfer({ walletProvider }) {
  const [targetAddress, setTargetAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [transferring, setTransferring] = useState(false);

  const transfer = async () => {
    try {
      const value = ethers.utils.parseEther(amount);
      const singer = walletProvider.getSigner();
      const tx = { to: targetAddress, value };
      setTransferring(true);
      const receipt = await singer.sendTransaction(tx);
      await receipt.wait();
      setTargetAddress("");
      setAmount("");
      alert("successfully transfered");
    } catch (error) {
      console.log(error);
      alert("failed to transfer");
    } finally {
      setTransferring(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-4xl font-bold">Transfer</div>
      {transferring ? (
        <div className="flex flex-col items-center gap-4">
          <div className="text-3xl">transferring...</div>
          <Loading size="xl" />
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <input
            className="input"
            value={targetAddress}
            onInput={(e) => setTargetAddress(e.target.value)}
            type="text"
            placeholder="address"
          />
          <input
            className="input"
            value={amount}
            onInput={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="amount"
          />
          <button className="btn" onClick={transfer}>
            send
          </button>
        </div>
      )}
    </div>
  );
}
