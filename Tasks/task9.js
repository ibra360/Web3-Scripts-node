import ERC20TransferABI from "../abi.js";
import Web3 from "web3";

async function main() {
  const testnetSoc = `wss://rinkeby.infura.io/ws/v3/84842078b09946638c03157f83405213`;
  const web3Soc = new Web3(testnetSoc);
  let currentBlockNum = await web3Soc.eth.getBlockNumber();
  console.log(
    "%ctask9.js line:9 currentBlockNum",
    "color: #007acc;",
    currentBlockNum
  );
  const TOKEN_ADDRESS = "0x051c3A370a833CCF2541dc2493D9da49Aaa4e15d";

  const _contractInstance = new web3Soc.eth.Contract(
    ERC20TransferABI,
    TOKEN_ADDRESS
  );
  _contractInstance.events
    .Transfer({
      fromBlock: 1001681, //currentBlockNum is taking quite long time to fully execute
    })
    .on("data", (event) => {
      console.log(event);
    })
    .on("error", console.error);
}
main();
