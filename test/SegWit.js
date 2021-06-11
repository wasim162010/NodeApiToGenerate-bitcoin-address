var bip39 = require('bip39');
var hdkey = require('hdkey');
var createHash = require('create-hash');
var btcLib = require('bitcoinjs-lib');
var bs58check = require('bs58check');

/*
const mnemonic = bip39.generateMnemonic(); //generates string
//const mnemonic = "gentle mutual speak consider mandate kingdom cash explain soul exile cabin squeeze";
const seed = bip39.mnemonicToSeed(mnemonic); //creates seed buffer
console.log('Seed: ' + seed);
console.log('mnemonic: ' + mnemonic);

const root = hdkey.fromMasterSeed(seed);
console.log('root: ' + root);
const masterPrivateKey = root.privateKey.toString('hex');
console.log('masterPrivateKey: ' + masterPrivateKey);

const addrnode = root.derive("m/44'/0'/0'/0/0");
console.log('addrnode: ' + addrnode);
console.log('addrnodePublicKey: '+ addrnode._publicKey)

const step1 = addrnode._publicKey;
const step2 = createHash('sha256').update(step1).digest();
const step3 = createHash('rmd160').update(step2).digest();

var step4 = Buffer.allocUnsafe(21);
step4.writeUInt8(0x00, 0);
step3.copy(step4, 1); //step4 now holds the extended RIPMD-160 result
const step9 = bs58check.encode(step4);
console.log('Base58Check: ' + step9);
*/

/*
	Mainnet
	pubKeyHash: 0x00, 

	Testnet
	pubKeyHash: 0x6f,
*/

//npm i --save hdkey


async function HDFunctions() {

	const mnemonic = bip39.generateMnemonic(); //generates string
//const mnemonic = "gentle mutual speak consider mandate kingdom cash explain soul exile cabin squeeze";
    const seed = await bip39.mnemonicToSeed(mnemonic);
	console.log("seed");
	console.log(seed);
    const root = hdkey.fromMasterSeed(seed);

	const masterPrivateKey = root.privateKey.toString('hex');
	console.log("masterPrivateKey",  masterPrivateKey);
	const masterPublicKey = root.publicKey.toString('hex');
	console.log("masterPublicKey", masterPublicKey);

	const addrnode = root.derive("m/44'/0'/0'/0/0");
	console.log('addrnode: ');
	console.log(addrnode);
	console.log('addrnodePublicKey: ');
	console.log(addrnode._publicKey);

	const step1 = addrnode._publicKey;//Get your public key
	console.log('step1: ');
	console.log(step1);
	const step2 = createHash('sha256').update(step1).digest(); //Perform SHA-256 hashing on the public key
	console.log('step2: ');
	console.log(step2);
	const step3 = createHash('rmd160').update(step2).digest(); //Perform RIPEMD-160 hashing on the result of SHA-256
	console.log('step3: ');
	console.log(step3);

	var step4 = Buffer.allocUnsafe(21);//Add version byte in front of RIPEMD-160 hash (0x00 for mainnet, 0x6f for testnet)
	console.log('step4: ');
	console.log(step4);
	step4.writeUInt8(0x00, 0);
	console.log('step4: ');
	console.log(step4);

	step3.copy(step4, 1); //step4 now holds the extended RIPMD-160 result
	const step9 = bs58check.encode(step4);
	console.log('Base58Check: ' + step9);

	return step9;
}

//HDFunctions();

exports.getSegWit = HDFunctions;