let fs = require('fs');
let solc = require('solc');
let web3 = require ('web3');
//注：eth_token.sol 是在node工程中已经写好的要发布的智能合约。
//加载需要发的智能合约，我这里用ERC20标准合约测试。代码看之前的博客

console.log(__dirname);
let rootDir=__dirname;
let sourceToken = fs.readFileSync(`${rootDir}/../contracts/checksol.sol`, "utf8");
//编译合约源码
let abiresult=solc.compile(sourceToken)
let cacl=solc.compile(sourceToken,1);
let bytecode=cacl.contracts[':TokenERC20'].bytecode;
//发布合约所需的大致费用
const price = 90000000000;
const limit = 60000;
//查询钱包地址的nonce
web3.eth.getTransactionCount("填写钱包地址",function (error,result) {
//封装交易
    var rawTx = {
        nonce: result,
        gasPrice: web3.toHex(price),
        gasLimit: web3.toHex(limit),
        from:"填写钱包地址",
        data: "0x"+bytecode,
    }
//私钥签名交易
    var pk = new Buffer("填写钱包地址的私钥", 'hex')
    var tx = new Tx(rawTx);
    tx.sign(pk);
    var serializedTx = tx.serialize();
//广播签名的交易
    web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), function (err, hash) {
        if (!err) {
// 发行成功 用返回的 hash 值去区块链上查询 成功状态
        }else{
        }
    })
})