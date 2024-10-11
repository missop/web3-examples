import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import Loading from "./Loading";

export default function Connect({ account, setAccount, walletProvider, setWalletProvider }) {
  const [balance, setBalance] = useState(0);
  const [networkName, setNetworkName] = useState("");

  useEffect(() => {
    if (!window.ethereum) {
      return;
    }

    setWalletProvider(new ethers.providers.Web3Provider(window.ethereum));
  }, []);

  const connectToMetamask = async () => {
    try {
      const accounts = await walletProvider.send("eth_requestAccounts", []);
      console.log(accounts);
      const network = await walletProvider.getNetwork();
      const balance = await walletProvider.getBalance(accounts[0]);
      setAccount(accounts[0]);
      setNetworkName(network.name);
      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.log(error);
      alert("failed to connect to metamask");
    }
  };

  const disconnect = () => {
    setAccount("");
  };

  if (!account) {
    return (
      <div className="flex p-4">
        {walletProvider ? (
          <button className="btn" onClick={connectToMetamask}>
            connect to metamask
          </button>
        ) : (
          <Loading />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h1 className="text-end">
          Hello, {account.substring(0, 5) + "..." + account.substring(account.length - 4, account.length)}
        </h1>
        <button className="btn" onClick={disconnect}>
          disconnect
        </button>
      </div>
      <div className="flex flex-col w-full gap-4 p-4 text-white rounded-md bg-slate-800">
        <div className="flex justify-between">
          <div className="text-2xl font-thin">balance</div>
          <div>network: {networkName}</div>
        </div>

        <div className="flex items-end gap-2">
          <div className="text-2xl">{balance.substring(0, 10)}</div>
          <div>ETH</div>
        </div>
      </div>
    </div>
  );
}
