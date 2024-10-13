import React, { useState } from "react";
import {
  Alert,
  Input,
  Button,
  useClipboard,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Heading,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { utils, writeFile } from "xlsx";

export default function WalletGenerator() {
  const [generateNum, setGenerateNum] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [wallets, setWallets] = useState([]);
  const { onCopy, value, setValue, hasCopied } = useClipboard("");

  const generate = async () => {
    const _wallets = [];
    setIsLoading(true);
    setTimeout(() => {
      for (let i = 0; i < generateNum; i++) {
        const wallet = ethers.Wallet.createRandom();
        _wallets.push(wallet);
      }
      setWallets(_wallets);
      // TODO: 生成钱包
      setIsLoading(false);
    }, 300);
  };

  const exports = () => {
    const book = utils.book_new();
    const data = wallets.map(({ address, publicKey, privateKey, mnemonic: { phrase } }) => ({
      address,
      publicKey,
      privateKey,
      phrase,
    }));
    const sheets = utils.json_to_sheet(data);
    sheets["!cols"] = [
      {
        wch: 50,
      },
      {
        wch: 140,
      },
      {
        wch: 70,
      },
      {
        wch: 80,
      },
    ];
    // 将 sheet 添加到 book
    utils.book_append_sheet(book, sheets);
    // 下载文件
    writeFile(book, "addresses.xlsx");
  };

  const handleCopy = (wallet) => {
    setValue(wallet.address);
    onCopy();
    alert("复制成功");
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl font-bold">钱包生成器</h2>
      <div>
        <strong>支持的功能：</strong>
        <ul>
          <li>生成钱包助记词、私钥、公钥等</li>
        </ul>
        <strong>科普：</strong>
        <ul>
          <li>地址：公开的，用来转账时使用的</li>
          <li>私钥：相当于密码，签名交易，证明对钱包的所有权</li>
          <li>公钥：公开的，用于接收来自他人的交易，或用于验证交易签名</li>
          <li>助记词：助记词是一种备份，如果你丢失了加密货币钱包的访问权限，它可以让你重新获得私钥。</li>
        </ul>
      </div>
      <Alert>一次最多生成 100 个钱包地址，如果生成过多会导致浏览器卡死。</Alert>
      <div className="flex gap-4 items-center">
        <Input
          w={"200px"}
          type="number"
          value={generateNum}
          max={100}
          onChange={(e) => {
            setGenerateNum(Number(e.target.value));
          }}
          placeholder="请输入生成数量"
        />
        <Button onClick={generate} colorScheme="blue" disabled={isLoading} isLoading={isLoading}>
          开始生成
        </Button>
        {wallets.length > 0 && (
          <Button variant="outline" colorScheme="blue" onClick={exports}>
            批量导出
          </Button>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <Accordion>
          {wallets.map((wallet) => {
            return (
              <AccordionItem key={wallet.privateKey} className="flex flex-col gap-2">
                <AccordionButton>
                  <Heading size="md">{wallet.address}</Heading>
                </AccordionButton>
                <AccordionPanel className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <p className="w-12">地址</p>
                    <Input
                      className="flex-1"
                      value={wallet.address}
                      readOnly
                      onClick={() => {
                        handleCopy(wallet);
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="w-12">公钥</p>
                    <Input
                      className="flex-1"
                      value={wallet.publicKey}
                      readOnly
                      onClick={() => {
                        handleCopy(wallet);
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="w-12">私钥</p>
                    <Input
                      className="flex-1"
                      value={wallet.privateKey}
                      readOnly
                      onClick={() => {
                        handleCopy(wallet);
                      }}
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <p className="w-12">助记词</p>
                    <Input
                      className="flex-1"
                      value={wallet.mnemonic.phrase}
                      readOnly
                      onClick={() => {
                        handleCopy(wallet);
                      }}
                    />
                  </div>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
