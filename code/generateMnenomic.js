var bip39 = require('bip39');

function generateMnemonic() {
    const mnemonic = bip39.generateMnemonic(); 
    return mnemonic;
}

exports.generateMnemonic = generateMnemonic;
