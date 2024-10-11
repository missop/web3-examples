## 本地运行

### 前端

前端代码位于 `frontend` 目录下。在运行之前，请确保完成以下准备工作：

1. 将 `.env.example` 文件重命名为 `.env`，并补充完整配置信息。
2. 至少在 [alchemy](https://www.alchemy.com/) 上申请一个 API Key。

接下来，安装依赖并启动项目：

```bash
npm i
npm run dev
```

### 智能合约

智能合约代码位于 `contract` 目录下。在运行之前，请确保完成以下准备工作：

1. 将 `.env.example` 文件重命名为 `.env`，并补充完整配置信息。
2. 至少在 [infura](https://www.infura.io/) 上申请一个 Project Key。

然后，你可以使用 `truffle` 进行智能合约开发。

## 第一节：简单钱包开发
### 需要实现的功能
✅连接 Metamask

✅查询余额

✅刷新余额

✅转账
### 注意事项
这里仅仅实现了 Metamask 钱包的功能，如果要兼容其他钱包，则需要对每一个钱包进行单独的判断

### 1.1 判断钱包插件是否安装
这里只列举几个钱包的安装方法：
| 钱包插件 | 判断方法 |
| --- | --- |
| Metamask | `window.ethereum` |
| BitKeep | `window.bitkeep.ethreum` |

可以搜索对应钱包，查看开发者文档，上面都有判断方法，如果没有安装钱包插件那么提示让用户安装