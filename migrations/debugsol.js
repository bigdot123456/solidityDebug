let fs = require('fs');
let solc = require('solc');
let web3 = require ('web3');
//注：eth_token.sol 是在node工程中已经写好的要发布的智能合约。
//加载需要发的智能合约，我这里用ERC20标准合约测试。代码看之前的博客

console.log(__dirname);
let rootDir=__dirname;
let sourceToken = fs.readFileSync(`${rootDir}/../contracts/golden.sol`, "utf8").toString();
//编译合约源码
let abiresult=solc.compile(sourceToken)
let bytecode=abiresult.contracts[':TokenERC20'].bytecode;