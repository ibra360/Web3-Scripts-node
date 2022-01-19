import Web3 from "web3";
const ETH_NODE_URL =
  "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213";
let web3 = new Web3(new Web3.providers.HttpProvider(ETH_NODE_URL));
const txnHash =
  "0xbc929260eb59164f2185c791f4ce582786bdb7813d788204f41c0b74d1a07baa";

web3.eth.getTransaction(txnHash, function (e, data) {
  if (e !== null) {
    console.log(
      "Could not find a transaction for your id! ID you provided was " + txnHash
    );
  } else {
    console.log(data);
    if (data.v == "0x0") {
      console.log("The contract execution was failed!");
    } else {
      let input_data = "0x" + data.input.slice(10);
      let params = web3.eth.abi.decodeParameters(
        ["address", "uint256"],
        input_data
      );
      console.log("%ctask6.js line:21 params", "color: #007acc;", params);
      console.log(
        `Execution worked fine! \n Sender :${data.from} \n Reciever ${params[0]} \n Number of tokens in wei: ${params[1]} `
      );
    }
  }
});
