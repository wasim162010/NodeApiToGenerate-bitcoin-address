var bitcoin = require('bitcoinjs-lib')
//var btcLib =  require('bitcoinjs-lib');


async function GenerateP2SH() { 

        key1 = bitcoin.ECKey.makeRandom()
        console.log(key1.toWIF())

        key2 = bitcoin.ECKey.makeRandom()
        console.log(key2.toWIF())

        key3 = bitcoin.ECKey.makeRandom()
        console.log(key3.toWIF())

        var privKeys = [key1, key2, key3]
       
        console.log("privKeys")
        console.log(privKeys)

        var pubKeys = privKeys.map(function(x) { return x.pub })
        console.log("pubKeys")
        console.log(pubKeys)

        var redeemScript = bitcoin.scripts.multisigOutput(2, pubKeys) // 2 of 3
        console.log("redeemScript")
        console.log(redeemScript)

        var scriptPubKey = bitcoin.scripts.scriptHashOutput(redeemScript.getHash())
        console.log("scriptPubKey")
        console.log(scriptPubKey)
        
        var multisigAddress = bitcoin.Address.fromOutputScript(scriptPubKey).toString()
        console.log("multisigAddress")
        console.log(multisigAddress)

        console.log("multisigP2SH:", multisigAddress)
        // => multisigP2SH: 35k9EWv2F1X5JKXHSF1DhTm7Ybdiwx4RkD

}

GenerateP2SH();