var bip39 = require('bip39');

//Below method is used to generate  the random mnemonic phrase
function generateMnemonic() {
    const mnemonic = bip39.generateMnemonic(); 
    return mnemonic;
}

exports.generateMnemonic = generateMnemonic;
