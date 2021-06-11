//npm install bitcoin-address-validation --save

const { validate, getAddressInfo } = require('bitcoin-address-validation');

function validateAddress(_bitcoinAddr) {

    var isValidAddr = validate(_bitcoinAddr);

    return isValidAddr;

}


function addressInfo(_bitcoinAddr) {

    return getAddressInfo(_bitcoinAddr);

}

exports.validateAddress = validateAddress;
exports.addressInfo = addressInfo;
