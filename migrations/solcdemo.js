let solc = require('solc');

let input = {
    language: 'Solidity',
    sources: {
        'test.sol': {
            content: 'contract C { function f() public { } }'
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

// `output` here contains the JSON output as specified in the documentation
for (var contractName in output.contracts['test.sol']) {
    console.log(
        contractName +
        ': ' +
        output.contracts['test.sol'][contractName].evm.bytecode.object
    );
}