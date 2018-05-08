const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const sigUtil = require('eth-sig-util');

function authenticate(internalUserIdentifier = 'username123', identityPhrase = 'user-token', 
    ethereumAddress = '0xWhoTheyClaimToBe', signedData = 'data-signed-by-users-wallet-expected-to-match-user-token',
    callback) {


    let statement = [{ type: 'string', name: 'eth-auth', value: identityPhrase}];
    let from = ethereumAddress.toLowerCase(); //inconsistencies in Metamask address display + the checksumming of sigUtil.. TODO: may need to check into this

    if (sig.length < 10) {
      callback({error: {message: "Invalid signature length", internalUserIdentifier: internalUserIdentifier, ethereumAddress: ethereumAddress}});
      return;
    }
    
    let rtsParam = { data: statement, sig: signedData };

    try {
      const recovered = sigUtil.recoverTypedSignature(rtsParam);
      if (recovered === from ) {
        callback({success: {internalUserIdentifier: internalUserIdentifier, recovered: recovered, identityPhrase: identityPhrase, ethereumAddress: ethereumAddress}});
      } else {
        callback({error: {message: "Invalid Signature", invalidData: recovered, internalUserIdentifier: internalUserIdentifier, ethereumAddress: ethereumAddress}});
      }
    } catch (ex) {
      callback({error: {message: "Error parsing signature", internalUserIdentifier: internalUserIdentifier, ethereumAddress: ethereumAddress}});
    }
}

module.exports = authenticate;