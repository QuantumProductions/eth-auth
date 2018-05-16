const Web3 = require('web3');
const BigNumber = require('bignumber.js');
const sigUtil = require('eth-sig-util');

function authenticate(internalUserIdentifier = 'username123', identityPhrase = 'user-token', 
    ethereumAddress = '0xWhoTheyClaimToBe', signedData = 'data-signed-by-users-wallet-expected-to-match-user-token') {

    let statement = [{ type: 'string', name: 'eth-auth', value: identityPhrase}];
    let from = ethereumAddress.toLowerCase();
    //inconsistencies in Metamask address display + the checksumming of sigUtil.. 
    //sigutil will recover message returning address as lowercase

    if (signedData.length < 10) {
      return {success: null, error: {message: "Invalid signature length", internalUserIdentifier: internalUserIdentifier, ethereumAddress: ethereumAddress}};
    }
    
    let rtsParam = { data: statement, sig: signedData };

    try {
      const recovered = sigUtil.recoverTypedSignature(rtsParam);
      if (recovered === from ) {
        return {error: null, success: {internalUserIdentifier: internalUserIdentifier, recovered: recovered, identityPhrase: identityPhrase, ethereumAddress: ethereumAddress}};
      } else {
        return {success: null, error: {message: "Invalid Signature", invalidData: recovered, internalUserIdentifier: internalUserIdentifier, ethereumAddress: ethereumAddress}};
      }
    } catch (ex) {
      return {success: null, error: {message: "Error parsing signature", internalUserIdentifier: internalUserIdentifier, ethereumAddress: ethereumAddress}};
    }
}

module.exports = authenticate;