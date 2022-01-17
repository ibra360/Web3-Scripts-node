import Web3 from "web3";

const ETH_NODE_URL =
  "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213";
let web3 = new Web3(new Web3.providers.HttpProvider(ETH_NODE_URL));
const txnHash="0x2f6189726e3d5e3b1e56f2dbca7f1ae60d21dc29e91a7fbb8004c8dbf1fc8587"

web3.eth.getTransactionReceipt(txnHash, function (e, data) {
    if (e !== null) {
        console.log("Could not find a transaction for your id! ID you provided was " + txnHash);
    } else {
        console.log(data);
        if(data.status == '0x0') {
            console.log("The contract execution was not successful, check your transaction !");
        } else {
            console.log("Execution worked fine! And the gas used in this txn is :",data.gasUsed );
        }
    }
})