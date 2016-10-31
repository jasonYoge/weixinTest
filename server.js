'use strict';
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const childProcess = require('child_process');
const mapping = require('./mapping');
const app = koa();
app.use(bodyParser());

let access_handler = childProcess.fork('./access.js');
access_handler.on('message', (m) => {
    global.access_token = m;
    // if (access_token) {
    //     throw new Error('access_token is undefined');
    // }
    console.log(global.access_token);
});

app.use(function *(next) {
    console.log(`Process ${this.method} ${this.url}`);
    yield next;
});
// console.log(mapping());
app.use(mapping());

app.listen(80, () => {
    console.log('running at port 80.');
});

