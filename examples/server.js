const ethAuth = require('eth-auth');
const express = require('express');

app = express();
app.use(express.static('index.html'));
var server = require('http').Server(app);

let port = 8000;
server.listen(port, function() {
  console.log("eth-auth example server listening on port " + port);
  console.log("Open localhost:" + port + " in a browser with an unlocked Metamask wallet.");
});

app.get('/', function(req,res) {
  res.sendFile(__dirname + "/index.html");
});

app.get('/accessContent', function(req, res) {
  let signature = req.query.signature;
  let address = req.query.address;
  let userId = 123;
  let token = "gibberishToken";
  //It makes sense to generate a new token per session
  //Perhaps through a websocket API. This example is just to demonstrate the signature decoding.
  //ethAuth library assumes the name of the message is eth-auth and the token value is up to you.
  //Look inside eth-auth's index.js if you want to customize the name of the message being signed.

  let {error, success} = ethAuth(userId, token, address, signature);
  if (success) {
    res.json({content: "http://combo.zone"});
  } else {
    res.json({error: error.message});
  }
});