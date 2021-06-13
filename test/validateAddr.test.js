
var mnemonic = require('../code/generateMnenomic.js');
var address = require('../code/generateAddress.js');
const assert = require('assert').strict;
var bitcoin = require('bitcoinjs-lib');

const { validate, getAddressInfo } = require('bitcoin-address-validation');



describe("validate address generation", function() {

    it('should generate an SegWit address', async () => {

        const addr = await address.genSegWitAddr();
        
        assert.notEqual(validate(addr) == false);
		
      });
      
    it('should generate an P2SH address', async () => {

        const pubkeys = [
            '026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01',
            '02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9',
            '03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9',
          ].map(hex => Buffer.from(hex, 'hex'));
          const { address } = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2ms({ m: 2, pubkeys }),
          });
  
        assert.notEqual(validate(address) == false);
		
	  });
});


describe("fetch address info", function() {

    it('should fetch an address info', async () => {

        const addr = await address.genSegWitAddr();
        assert.notEqual(getAddressInfo(addr) == "");
		
      });
      
});


