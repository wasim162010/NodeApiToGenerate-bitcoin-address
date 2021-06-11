var express = require('express');
var segWit = require('./SegWit.js');

var app = express();
app.listen(8081);

// app.get('/segwit', function(req, res) {
//         console.log('segwit');
//     var outp = segWit.getSegWit();
//     console.log(outp);
//     res.send(outp);

//    });

app.get('/hello', function(req, res) {
    //console.log('segwit');

    res.send("hello");

});


app.get('/gi', async(req, res) => {

    console.log('segwit');
    var outp = await segWit.getSegWit();
    console.log(outp);
    res.send(outp);
  })
  //api are also done.

  //have breakfast
  //

  