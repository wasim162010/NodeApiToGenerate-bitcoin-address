

//npm install bip39 --save
//npm install hdkey --save
//npm install create-hash --save
//npm install bitcoinjs-lib --save
//npm install bs58check --save


// var bip39 = require('bip39');
// var hdkey = require('hdkey');
// var createHash = require('create-hash');
// var btcLib = require('bitcoinjs-lib');
// var bs58check = require('bs58check');

var mnemonic = require('../code/generateMnenomic.js');
var address = require('../code/generateAddress.js');
const assert = require('assert').strict;



describe("integration test", function() {
    it("should be able to add and complete TODOs", function() {
		const mnemonics = mnemonic.generateMnemonic();
		console.log(mnemonics);
		assert.notStrictEqual(mnemonics != null);
    });
});


// describe('unit tests', function() {
	
// 	it('should generate a mnemonic', function() {
// 		const mnemonics = mnemonic.generateMnemonic();
// 		console.log(mnemonics);
// 		assert.notStrictEqual(mnemonics != null);
// 	});
	
// });


