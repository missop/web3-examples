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