require("dotenv").config();
const pkg = require("ethers");
const { ethers } = pkg;
const Web3 = require("web3");
const axios = require("axios");
const EthereumTx = require("ethereumjs-tx");
const log = require("ololog").configure();
const ansi = require("ansicolor").nice;

const WALLET_ADDRESS = "0x5C22594Bac91A1caCd32c53afdcBd2e8350bD0E8";
const testnet = `https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213`;
const RECIEVER_ADDRESS = "0xCd343942C6D1Dc6734a35d1304f23938d2c41a07";
const WALLET_PRIVATE_KEY =
  "72eb2c749a21affaae3a40ff3881a9f8c966210c2e0f53c1cb835de428603174"; //do not push this

const amountToSend = "0.001";

const getGasPrice = async () => {
  const { data } = await axios.get(
    "https://ethgasstation.info/api/ethgasAPI.json"
  );
  console.log("GAS PRICE AVG===", data.average);
  let prices = {
    low: data.safeLow / 10,
    medium: data.average / 10,
    high: data.fast / 10,
  };
  return prices;
};

const main = async () => {
  try {
    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));

    let myBalanceWei = await web3.eth.getBalance(WALLET_ADDRESS);
    let myBalance = ethers.utils.formatUnits(myBalanceWei);

    let recBalanceWei = await web3.eth.getBalance(RECIEVER_ADDRESS);
    let recBalance = ethers.utils.formatUnits(recBalanceWei);

    log(`Sender wallet balance is currently ${myBalance} ETH`.blue);
    log(`Reciever wallet balance is currently ${recBalance} ETH`.blue);

    let nonce = await web3.eth.getTransactionCount(WALLET_ADDRESS);
    log(`The Nonce is: ${nonce}`.magenta);

    let gasPrices = await getGasPrice();

    let details = {
      to: RECIEVER_ADDRESS,
      value: web3.utils.toHex(web3.utils.toWei(amountToSend, "ether")),
      gas: web3.utils.toHex(21000),
      gasPrice: gasPrices.low * 10 ** 8, // converts the gwei price to wei
      nonce: nonce,
      chainId: 4, // EIP 155 chainId - mainnet: 1, rinkeby: 4
    };

    const transaction = new EthereumTx(details);
    transaction.sign(Buffer.from(WALLET_PRIVATE_KEY, "hex"));
    const serializedTransaction = transaction.serialize();
    const raw = "0x" + serializedTransaction.toString("hex");

    const transactionId = await web3.eth
      .sendSignedTransaction(raw)

      .once("transactionHash", (txHash) => {
        log(`The txHash is: ${txHash}`.magenta);
      })
      .once("receipt", (p) => {
        log(`The receipt is: ${p}`.magenta);
      })
      .once("confirmation", async (conf) => {
        console.log("confirmation====", conf);
        let senderCurrentBalance = await web3.eth.getBalance(WALLET_ADDRESS);
        let receiverCurrentBalance = await web3.eth.getBalance(
          RECIEVER_ADDRESS
        );
        console.log(
          "SENDER CURRENT BALANCE====",
          ethers.utils.formatUnits(senderCurrentBalance)
        );
        console.log(
          "RECEIVER CURRENT BALANCE====",
          ethers.utils.formatUnits(receiverCurrentBalance)
        );
      })

      .once("error", (err) => {
        console.log("err", err);
        throw err;
      });

    const url = `https://rinkeby.etherscan.io/tx/${transactionId}`;
    log(url.cyan);
  } catch (e) {
    log(`Error is ${e}`.red);
  }
};

main();
