var bip39 = require('bip39');
var hdkey = require('hdkey');
var createHash = require('create-hash');
var btcLib = require('bitcoinjs-lib');
var bs58check = require('bs58check');
var mnemonic = require('../code/generateMnenomic.js');
var loadmin = require('../bitcoinjs.min.js');
var bitcoin = require('bitcoinjs-lib');



async function genSegWitAddr() {

	const mnemonics = mnemonic.generateMnemonic();  //generates string
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

	const step9 = bs58check.encode(step4);
	console.log('Base58Check: ' + step9);
	return step9;
	
}


async function genP2SH() { 

	var privKeys = [bitcoin.ECKey.makeRandom(), bitcoin.ECKey.makeRandom(), bitcoin.ECKey.makeRandom()]
	var pubKeys = privKeys.map(function(x) { return x.pub })
	var redeemScript = bitcoin.scripts.multisigOutput(2, pubKeys) // 2 of 3
	var scriptPubKey = bitcoin.scripts.scriptHashOutput(redeemScript.getHash())
	
	var multisigAddress = bitcoin.Address.fromOutputScript(scriptPubKey).toString()
	
	console.log("multisigP2SH:", multisigAddress);

	return multisigAddress;

}


exports.genSegWitAddr = genSegWitAddr;
exports.genP2SH = genP2SH;