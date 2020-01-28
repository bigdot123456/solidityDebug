let Tx     = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const ethers = require('ethers');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
// set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

const account3 = '0xdDFc34d879f0DF732e53ad73e1110BE0015a072c'; // Your account address 1
const account2 = '0xcab019b2F6b4aD3E192E0E145586B02B87a27550'; // Your account address 2
const account1 = '0x9448ACAE34D79ACDb6CE8F26a378D9A92EA1F9Ac'; // Your account address 2

const pk3 = 'd622a5cbb84e9e78fd90e8544e94e1d0e5ff4dadfd864122486d6a8bb089381c'; // 实际项目中应该从process.env.PRIVATE_KEY_1中读取
const pk2 = '9f2591ec474cf9f5c4a2319b1c3c4dd29246ab1272ba43347c29f75fabc6ecd7';// 实际项目中应该从process.env.PRIVATE_KEY_2中读取
const pk1 = '97e16d9f8454d91461e1ef06fe95ac1b805505dcf07b2c87540035557b1c6602'; // 实际项目中应该从process.env.PRIVATE_KEY_2中读取

const privateKey1 = Buffer.from(pk1, 'hex');
const privateKey2 = Buffer.from(pk2, 'hex');
const privateKey3 = Buffer.from(pk3, 'hex');

web3.eth.getTransactionCount(account1, (err, txCount) => {
    // 创建交易对象
    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        to:       account2,
        value:    web3.utils.toHex(web3.utils.toWei('0.1', 'ether')),
        gasLimit: web3.utils.toHex(21000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei'))
    }

    // 签署交易
    const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
    tx.sign(privateKey1)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')

    // 广播交易
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
        // 可以去ropsten.etherscan.io查看交易详情
    })
})