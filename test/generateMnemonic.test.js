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