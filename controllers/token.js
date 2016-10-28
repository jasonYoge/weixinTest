'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sha1 = crypto.createHash('sha1');

//  get token from local .txt file
const TOKEN = fs.readFileSync(path.resolve(__dirname, '../const/token.txt'))
    .toString();
//  ensure token is exist
if (!TOKEN) {
    throw new Error('token is undefined!');
}
//  token router
const fn_token = function *() {
    let timestamp = this.params.timestamp,
        nonce = this.params.nonce,
        signature = this.params.signature,
        echostr = this.params.echostr;

    let tmpArr = [TOKEN, timestamp, nonce].sort();
    let tmpStr = tmpArr.join('');
    //  sha1 validate
    sha1.update(tmpStr);
    tmpStr = sha1.digest('base64');

    if (tmpStr === signature) {
        this.body = echostr;
    } else {
        console.log('token validation failed.');
    }
}
//  export
module.exports = {
    'GET /token': fn_token
}
