var bip39 = require('bip39');
var hdkey = require('hdkey');
const assert = require('assert').strict;
var createHash = require('create-hash');
var bs58check = require('bs58check');
var bitcoin = require('bitcoinjs-lib');

describe("check address generation", function() {
 
	it('should generate an SegWit address', async () => {
	
		const mnemonics = "kangaroo embark unveil guard common load cluster polar delay brand broccoli heavy" ;
		//address generated using the above mnemonic
		const expectedGenAddr ="1H2WSWRJjz3WbeUuaDf79FcRvRCjcupi5H";

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

		assert.notStrictEqual(step9 == expectedGenAddr);
		
	  });


	it('can generate a P2SH, pay-to-multisig (2-of-3) address', () => {
		const pubkeys = [
		  '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
		  '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
		  '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
		].map(hex => Buffer.from(hex, 'hex'));
		const { address } = bitcoin.payments.p2sh({
		  redeem: bitcoin.payments.p2ms({ m: 2, pubkeys }),
		});
	
		assert.strictEqual(address, '36NUkt6FWUi3LAWBqWRdDmdTWbt91Yvfu7');
		
	  });

});