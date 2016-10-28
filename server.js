'use strict';
const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const mapping = require('./mapping');
const app = koa();
app.use(bodyParser());

app.use(function *(next) {
    console.log(`Process ${this.method} ${this.url}`);
    yield next;
});
// console.log(mapping());
app.use(mapping());

app.listen(8080, () => {
    console.log('running at port 8080.');
});
