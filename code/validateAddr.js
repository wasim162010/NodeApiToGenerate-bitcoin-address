//npm install bitcoin-address-validation --save

const { validate, getAddressInfo } = require('bitcoin-address-validation');

//Below method is used to validate the bitcoin address
function validateAddress(_bitcoinAddr) {

    var isValidAddr = validate(_bitcoinAddr);

    return isValidAddr;

}

//Below method is used to get the address about the bitcoin address
function addressInfo(_bitcoinAddr) {

    return getAddressInfo(_bitcoinAddr);

}

exports.validateAddress = validateAddress;
exports.addressInfo = addressInfo;
