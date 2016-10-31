'use strict';
const request = require('request');

const appID = 'wx7be8be419dee44cc';
const appSecret = '5feea50308033b8b84740ee98d452864';
const apiAddress = ['api.weixin.qq.com',
    'sh.api.weixin.qq.com', 'sz.api.weixin.qq.com',
    'hk.api.weixin.qq.com'];
const grantType = 'client_credential';
const url = `https://${apiAddress[0]}/cgi-bin/token?grant_type=${grantType}&appid=${appID}&secret=${appSecret}`;

let expires;
// request(url, (err, response, body) => {
//     if (err)
//         throw new Error(err);

//     process.send(body);
// });
getAccess();
// Get access_token from weixin server
function getAccess () {
    request(url, (err, response, body) => {
        if (err)
            throw new Error(err);
        expires = JSON.parse(body).expires_in * 1000;
        setTimeout(getAccess, expires - 60000);
        process.send(body);
    });
}
