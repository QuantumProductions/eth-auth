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

  let {error, success} = ethAuth(userId, token, address, signature);
  if (success) {
    res.json({content: "http://combo.zone"});
  } else {
    res.json({error: error.message});
  }
});