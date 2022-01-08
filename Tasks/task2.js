const ERC20TransferABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "delegate",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "numTokens",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenOwner",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "numTokens",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "numTokens",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const Web3 = require("web3");
const pkg = require("ethers");
const { ethers } = pkg;
const log = require("ololog").configure();
const testnet = `https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213`;
const EthereumTx = require("ethereumjs-tx");
const axios = require("axios");
const TOKEN_ADDRESS = "0x051c3A370a833CCF2541dc2493D9da49Aaa4e15d";
const senderAddress = "0x5C22594Bac91A1caCd32c53afdcBd2e8350bD0E8";
const receiverAddress = "0xCd343942C6D1Dc6734a35d1304f23938d2c41a07";
const WALLET_PRIVATE_KEY =
  "72eb2c749a21affaae3a40ff3881a9f8c966210c2e0f53c1cb835de428603174"; //do not push this

const main = async () => {
  try {
    const web3 = new Web3(testnet);

    const erc20Token = new web3.eth.Contract(ERC20TransferABI, TOKEN_ADDRESS);
    const user = web3.eth.accounts.wallet.add(WALLET_PRIVATE_KEY);

    const getBalance = () => {
      erc20Token.methods.balanceOf(senderAddress).call(function (err, res) {
        if (res) {
          console.log("The balance is: ", res);
          // return;
        } else {
          console.log("An error occured bhai", err);
        }
      });
    };

    const transferTokens = async () => {
      try {
        erc20Token.methods
          .transfer(receiverAddress, "100000000000000")
          .send({ from: user.address, gas: "96000" }, function (err, res) {
            if (err) {
              console.log("An error occured", err);
              return;
            }
            console.log("Hash of the transaction: ", res);
          });
      } catch (e) {
        console.log(e);
      }
    };

    const transferFrom = async () => {
      try {
        // console.log(web3.utils.fromWei("100000000000000"));
        const allow = await erc20Token.methods
          .allowance(senderAddress, receiverAddress)
          .call(function (err, res) {
            if (err) {
              console.log("An error occured in allownace", err);
              return;
            }
            console.log("Allowance amount ", res);
          });

        if (!Number(allow)) {
          await erc20Token.methods
            .approve(senderAddress, web3.utils.toWei("1000000000000000000"))
            .send(
              { from: user.address, gasLimit: "86000" },
              function (err, res) {
                if (err) {
                  console.log("An error occured in approve", err);
                  return;
                }
                console.log("Hash of the  approve transaction: ", res);
              }
            );
        }

        await erc20Token.methods
          .transferFrom(senderAddress, receiverAddress, "100000000000000")
          .send({ from: user.address, gasLimit: "96000" }, function (err, res) {
            if (err) {
              console.log("An error occured in tf", err);
              return;
            }
            console.log("Hash of the transferFrommm transaction: ", res);
          });
      } catch (e) {
        console.log("Error in catch block", e);
      }
    };

    // getBalance();
    // transferTokens();
    transferFrom();
  } catch (e) {
    console.log("ERRORrrrrrrrrrrrrrrr", e);
  }
};
main();
