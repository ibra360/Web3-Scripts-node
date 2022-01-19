import Web3 from "web3";
import ERC20TransferABI from "../abi.js";

const testnet = `https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213`;
const walletAddress = "0x5C22594Bac91A1caCd32c53afdcBd2e8350bD0E8";
const web3 = new Web3(testnet);

async function getTransactionofAddress() {
  let currentBlockNum = 9928253; //await web3.eth.getBlockNumber();

  let txFound = false;

  while (currentBlockNum >= 0 && !txFound) {
    const block = await web3.eth.getBlock(currentBlockNum, true);
    console.log("block===================================", block);
    const transact = block.transactions;
  console.log('%ctask8.js line:17 transact.length', 'color: #007acc;', transact.length);
    for (let j = 0; j < transact.length; j++) {
    
      if (transact[j] != null) {
        //console.log('transactions',transact[j].hash);
        const receipt = await web3.eth.getTransaction(transact[j].hash);
        if (receipt.from.toLowerCase() == walletAddress.toLowerCase()) {
          txFound = true;
          console.log(`Transaction: ${transact[j].from}`);
          break;
        }
      }
    }
  }
}
getTransactionofAddress();
