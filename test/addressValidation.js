//npm install bitcoin-address-validation --save

const { validate, getAddressInfo } = require('bitcoin-address-validation');


var isFine = validate('1DNYzSh84XvtAMXf1Puk3Dob3gUwQnHdyM');

console.log(isFine);

console.log(getAddressInfo('1DNYzSh84XvtAMXf1Puk3Dob3gUwQnHdyM'));