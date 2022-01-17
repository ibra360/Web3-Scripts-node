


import Web3 from "web3";
const ETH_NODE_URL =
  "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213";
let web3 = new Web3(new Web3.providers.HttpProvider(ETH_NODE_URL));
const txnHash="0xf83387377922b83bebdfebcde8b89e69daf91cdc44d5e2fa919b5db2b66e55b0"

web3.eth.getTransaction(txnHash, function (e, data) {
    if (e !== null) {
        console.log("Could not find a transaction for your id! ID you provided was " + txnHash);
    } else {
        console.log(data);
        if(data.status == '0x0') {
            console.log("The contract execution was failed!");
        } else {
            console.log(`Execution worked fine! \n Sender :${data.from} \n Reciever ${data.to} \n Number of tokens in wei: ${data.value} `);
        }
    }
})