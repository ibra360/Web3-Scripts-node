import Web3 from "web3";
import ERC20TransferABI from "../abi.js";

const ETH_NODE_URL =
  "https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213";
let web3 = new Web3(new Web3.providers.HttpProvider(ETH_NODE_URL));

const contractAddress = "0x051c3A370a833CCF2541dc2493D9da49Aaa4e15d";

const contract = new web3.eth.Contract(ERC20TransferABI, contractAddress);
contract.getPastEvents(
  "AllEvents",
  {
    fromBlock: 9951992,
    toBlock: "latest",
  },
  (err, events) => {
    if (err) {
      console.log(err);
    }
    let filtered = events.filter((ev) => ev.event === "Transfer");
    console.log(filtered.length);
  }
);
