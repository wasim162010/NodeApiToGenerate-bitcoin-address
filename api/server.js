var express = require('express');
const bodyParser = require('body-parser');
var mnemonic = require('../code/generateMnenomic.js');
// var mnemonic = require('../code/generateMnenomic.js');
var address = require('../code/generateAddress.js');
var validate = require('../code/validateAddr.js');

var loadmin = require('../bitcoinjs.min.js');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.listen(8081);


app.get('/v1/get/mnemonic', function(req, res) {

    mnemonic.generateMnemonic();
    res.send(JSON.stringify({"mnemonic":mnemonic.generateMnemonic()}));

});

//1H2WSWRJjz3WbeUuaDf79FcRvRCjcupi5H
//1H2WSWRJjz3WbeUuaDf79FcRvRCjcupi5H
//1H2WSWRJjz3WbeUuaDf79FcRvRCjcupi5H

app.get('/v1/get/address/segwit', async(req, res) => {

    console.log('segwit');
    var _addr = await address.genSegWitAddr();
    console.log(_addr);
    res.send(JSON.stringify({"address":_addr}));

  });  

app.get('/v1/get/address/p2sh', async(req, res) => {

    console.log('segwit');
    var _addr = await address.genP2SH();
    console.log(_addr);
   res.send(JSON.stringify({"address":_addr}));

  }); 


app.get('/v1/get/address/validate', async(req, res) => {
    
    var param = req.body;
    console.log(param.address);
    console.log('validate address');
    var isValidAddr = await validate.validateAddress(param.address);
    console.log(isValidAddr);
    res.send(JSON.stringify({"isValid":isValidAddr}));

  }); 

app.get('/v1/get/address/info', async(req, res) => {

    var param = req.body;
    console.log(param.address);
    console.log('address info');
    var info = await validate.addressInfo(param.address);
    console.log(info);
    res.send(JSON.stringify({"info":info}));

  }); 


  