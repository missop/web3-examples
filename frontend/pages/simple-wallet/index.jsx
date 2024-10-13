import React, { useState } from "react";
import dynamic from "next/dynamic";
import Connect from "./components/Connect";
import Transfer from "./components/Transfer";

export default dynamic(() => Promise.resolve(SimpleWallet), { ssr: false });

function SimpleWallet() {
  const [account, setAccount] = useState("");
  const [walletProvider, setWalletProvider] = useState(null);

  //有没有安装 MetaMack 浏览器插件
  if (!window.ethereum) {
    return (
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-thin">
          Please install
          <a href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn">MetaMask</a>
        </h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">简单钱包</h2>
      <div>
        <strong>支持的功能：</strong>
        <ul>
          <li>连接 MetaMask</li>
          <li>查询账户余额</li>
          <li>转账</li>
        </ul>
      </div>

      <Connect
        account={account}
        setAccount={setAccount}
        walletProvider={walletProvider}
        setWalletProvider={setWalletProvider}
      />
      {account && <Transfer walletProvider={walletProvider} />}
    </div>
  );
}
