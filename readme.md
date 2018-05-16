```
//Validate a user has control of their Ethereum address by decoding their signing of an authentication token.

const ethAuth = require('eth-auth');
const express = require('express');

app = express();
var server = require('http').Server(app);

let port = 8000;

app.get('/accessContent', function(req, res) {
  let signature = req.query.signature;
  let address = req.query.address;
  let userId = 123;
  let token = "gibberishToken";

  let {error, success} = ethAuth(userId, token, address, signature);
  if (success) {
    res.json({content: "http://combo.zone"});
  } else {
    res.json({error: error.message});
  }
});
```