//npm install bip39 --save
//npm install hdkey --save
//npm install create-hash --save
//npm install bitcoinjs-lib --save
//npm install bs58check --save


var bip39 = require('bip39');
var hdkey = require('hdkey');
var createHash = require('create-hash');
var btcLib = require('bitcoinjs-lib');
var bs58check = require('bs58check');
var mnemonic = require('../code/generateMnenomic.js');
var loadmin = require('../bitcoinjs.min.js');



async function genSegWitAddr() {

	const mnemonics = mnemonic.generateMnemonic(); //bip39.generateMnemonic(); //generates string
    const seed = await bip39.mnemonicToSeed(mnemonics);
    const root = hdkey.fromMasterSeed(seed);

	const masterPrivateKey = root.privateKey.toString('hex');
	const masterPublicKey = root.publicKey.toString('hex');

	const addrnode = root.derive("m/44'/0'/0'/0/0");
	console.log(addrnode._publicKey);

	const step1 = addrnode._publicKey;//Get your public key
	const step2 = createHash('sha256').update(step1).digest(); //Perform SHA-256 hashing on the public key
	const step3 = createHash('rmd160').update(step2).digest(); //Perform RIPEMD-160 hashing on the result of SHA-256

	var step4 = Buffer.allocUnsafe(21);//Add version byte in front of RIPEMD-160 hash (0x00 for mainnet, 0x6f for testnet)
	step4.writeUInt8(0x00, 0);
	step3.copy(step4, 1); //step4 now holds the extended RIPMD-160 result

	return step9;
	
}



async function genP2SH() { 

	key1 = bitcoin.ECKey.makeRandom()
	console.log(key1.toWIF())

	key2 = bitcoin.ECKey.makeRandom()
	console.log(key2.toWIF())

	key3 = bitcoin.ECKey.makeRandom()
	console.log(key3.toWIF())

	var privKeys = [key1, key2, key3]
   
	console.log("privKeys")
	console.log(privKeys)

	var pubKeys = privKeys.map(function(x) { return x.pub })
	console.log("pubKeys")
	console.log(pubKeys)

	var redeemScript = bitcoin.scripts.multisigOutput(2, pubKeys) // 2 of 3
	console.log("redeemScript")
	console.log(redeemScript)

	var scriptPubKey = bitcoin.scripts.scriptHashOutput(redeemScript.getHash())
	console.log("scriptPubKey")
	console.log(scriptPubKey)
	
	var multisigAddress = bitcoin.Address.fromOutputScript(scriptPubKey).toString()
	console.log("multisigAddress")
	console.log(multisigAddress)

	console.log("multisigP2SH:", multisigAddress)
	// => multisigP2SH: 35k9EWv2F1X5JKXHSF1DhTm7Ybdiwx4RkD
	return multisigAddress;

}


exports.genSegWitAddr = genSegWitAddr;
exports.genP2SH = genP2SH;