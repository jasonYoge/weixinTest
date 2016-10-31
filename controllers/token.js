'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const sha1 = crypto.createHash('sha1');
//  get token from local .txt file
const TOKEN = fs.readFileSync(path.resolve(__dirname, '../const/token.txt'))
    .toString().replace(/[\r\n]/g, '');
//  ensure token is exist
if (!TOKEN) {
    throw new Error('token is undefined!');
}
//  token router
const fn_token = function *() {
    let timestamp = this.query.timestamp,
        nonce = this.query.nonce,
        signature = this.query.signature,
        echostr = this.query.echostr;

    let tmpArr = [TOKEN, timestamp, nonce].sort();
    let tmpStr = tmpArr.join('');
    //  sha1 validate
    sha1.update(tmpStr);
    tmpStr = sha1.digest('hex');

    if (tmpStr === signature) {
        this.body = echostr;
    } else {
        this.body = 'token is worng.';
        console.log('token worng.');
    }
}
//  export
module.exports = {
    'GET /token': fn_token
}
