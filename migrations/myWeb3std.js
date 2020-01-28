let Tx     = require('ethereumjs-tx').Transaction;
const Web3 = require('web3');
const ethers = require('ethers');

//const web3 = new Web3('https://ropsten.infura.io/v3/a29df21c0ccb4d55b2aff2125020e029')

// You can use any standard network name
//  - "homestead"
//  - "rinkeby"
//  - "ropsten"
//  - "kovan"
//  - "goerli"

// You can use any standard network name
//  - "homestead"
//  - "rinkeby"
//  - "ropsten"
//  - "kovan"

let defaultProvider = ethers.getDefaultProvider('kovan');
// ... OR ...
let etherscanProvider = new ethers.providers.EtherscanProvider('kovan');
// ... OR ...
let infuraProvider = new ethers.providers.InfuraProvider('ropsten');

// When using a Web3 provider, the network will be automatically detected

// e.g. HTTP provider
let currentProvider = new Web3.providers.HttpProvider("http://localhost:7545");

let web3Provider = new ethers.providers.Web3Provider(currentProvider);

// When using the JSON-RPC API, the network will be automatically detected
// Default: http://localhost:8545
let httpProvider = new ethers.providers.JsonRpcProvider();
// To connect to a custom URL:
let url = "http://something-else.com:8546";
let customHttpProvider = new ethers.providers.JsonRpcProvider(url);
// Connect over named pipes using IPC:
let path = "/var/run/parity.ipc";
let ipcProvider = new ethers.providers.IpcProvider(path);

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
// set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
}

// use the following account!
let b=web3.eth.accounts.create();
let account0=b.address;
let pk0=b.privateKey;

const account1 = '0xdDFc34d879f0DF732e53ad73e1110BE0015a072c'; // Your account address 1
const account2 = '0xcab019b2F6b4aD3E192E0E145586B02B87a27550'; // Your account address 2
const account3 = '0x9448ACAE34D79ACDb6CE8F26a378D9A92EA1F9Ac'; // Your account address 2

const pk1 = 'd622a5cbb84e9e78fd90e8544e94e1d0e5ff4dadfd864122486d6a8bb089381c'; // 实际项目中应该从process.env.PRIVATE_KEY_1中读取
const pk2 = '9f2591ec474cf9f5c4a2319b1c3c4dd29246ab1272ba43347c29f75fabc6ecd7';// 实际项目中应该从process.env.PRIVATE_KEY_2中读取
const pk3 = '97e16d9f8454d91461e1ef06fe95ac1b805505dcf07b2c87540035557b1c6602'; // 实际项目中应该从process.env.PRIVATE_KEY_2中读取

const privateKey0 = Buffer.from(pk0, 'hex');
const privateKey1 = Buffer.from(pk1, 'hex');
const privateKey2 = Buffer.from(pk2, 'hex');
const privateKey3 = Buffer.from(pk3, 'hex');

web3.eth.getTransactionCount(account3, (err, txCount) => {

    const data = "0x608060405234801561001057600080fd5b506040518060400160405280600781526020017f6d7956616c7565000000000000000000000000000000000000000000000000008152506000908051906020019061005c929190610062565b50610107565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100a357805160ff19168380011785556100d1565b828001600101855582156100d1579182015b828111156100d05782518255916020019190600101906100b5565b5b5090506100de91906100e2565b5090565b61010491905b808211156101005760008160009055506001016100e8565b5090565b90565b61030f806101166000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80634ed3885e1461003b5780636d4ce63c146100f6575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f820116905080830192505050505050509192919290505050610179565b005b6100fe610193565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561013e578082015181840152602081019050610123565b50505050905090810190601f16801561016b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b806000908051906020019061018f929190610235565b5050565b606060008054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561022b5780601f106102005761010080835404028352916020019161022b565b820191906000526020600020905b81548152906001019060200180831161020e57829003601f168201915b5050505050905090565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061027657805160ff19168380011785556102a4565b828001600101855582156102a4579182015b828111156102a3578251825591602001919060010190610288565b5b5090506102b191906102b5565b5090565b6102d791905b808211156102d35760008160009055506001016102bb565b5090565b9056fea265627a7a72315820f5df86185a4d1d6fa207ed96829d0ff774b214b849e6af605bfc345c5f769ae864736f6c634300050b0032"
    console.log('run data');
    // 创建交易对象
    const txObject = {
        nonce:    web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(1000000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')),
        data: data
    };

    // 签署交易
    const tx = new Tx(txObject, { chain: 'ropsten', hardfork: 'petersburg' })
    tx.sign(privateKey3)

    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')
    console.log(raw)
    // 广播交易
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        console.log('txHash:', txHash)
        // 可以去ropsten.etherscan.io查看交易详情
    })
});
