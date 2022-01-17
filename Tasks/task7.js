import Web3 from "web3";
import ERC20TransferABI from "../abi.js";
const TOKEN_ADDRESS = "0x051c3A370a833CCF2541dc2493D9da49Aaa4e15d";
const senderAddress = "0x5C22594Bac91A1caCd32c53afdcBd2e8350bD0E8";
const testnet = `https://rinkeby.infura.io/v3/84842078b09946638c03157f83405213`;
const WALLET_PRIVATE_KEY =
  "72eb2c749a21affaae3a40ff3881a9f8c966210c2e0f53c1cb835de428603174"; //do not push this

const task7 = async () => {
  try {
    const web3 = new Web3(testnet);
    const user = web3.eth.accounts.wallet.add(WALLET_PRIVATE_KEY);

    const erc20Token = new web3.eth.Contract(ERC20TransferABI, TOKEN_ADDRESS);
    var NONCE = await web3.eth.getTransactionCount(user.address);

    let aprove = erc20Token.methods
      .approve(senderAddress, 1000000000000)
      .send({
        from: user.address,
        gasLimit: 200000,
        gasPrice: web3.utils.toWei("20", "gwei"),
        nonce: NONCE,
      })
      .then(console.log("First txn confirmed"));
    // console.log("First txn ============", aprove);
    console.log("=========== Cancel txn in progress ============");

    let cancelApprove = await erc20Token.methods
      .approve(senderAddress, 1000000000000)
      .send({
        from: user.address,
        gasLimit: 220000,
        gasPrice: web3.utils.toWei("2100", "gwei"),
        nonce: NONCE,
      })
      .then(console.log);

    // console.log("Cancel Txn ==============", cancelApprove);
  } catch (e) {
    console.log(e);
  }
};
task7();

//   var cancel = await web3.eth.sendTransaction({
//     from: user.address,
//     to: user.address,
//     value: 0,
//     nonce: NONCE,
//     gasLimit: 210000 ,
//     gasPrice: web3.utils.toWei('2100', 'gwei')
//   });
