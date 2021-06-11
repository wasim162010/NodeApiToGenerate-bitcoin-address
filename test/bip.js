//https://medium.com/bitcraft/so-you-want-to-build-a-bitcoin-hd-wallet-part-1-8b27aa001ac3

const bip39 = require('bip39')
var HDKey = require('hdkey')

const mnemonic = bip39.generateMnemonic()
console.log(mnemonic);

// bip39.mnemonicToSeed(mnemonic).then(function(data) {
//     console.log(data.toString('hex'));
// }); //creates seed buffer


//const root = HDKey.fromMasterSeed(seed);
//console.log(root);
//const masterPrivateKey = root.privateKey.toString('hex')
//console.log(masterPrivateKey);

async function HDFunctions() {

    const seed = await bip39.mnemonicToSeed(mnemonic);
    console.log(seed);
    const root = HDKey.fromMasterSeed(seed);
    const masterPrivateKey = root.privateKey.toString('hex');
    const masterPublicKey = root.publicKey.toString('hex');
   // const masterPrivateKey = await global.privateKey.toString('hex');
    console.log(masterPrivateKey);
    console.log(masterPublicKey);

  

}

HDFunctions();