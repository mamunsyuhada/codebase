#!/usr/bin/env node
const app = require('./bin/app');
const http = require('http');
const infra = require('./bin/helpers/infra');
const mongo = require('./bin/helpers/mongo');
const obeserver = require('./bin/modules/observer');

const port = infra.port || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    mongo.connect();
    obeserver.init();
    console.log('------INFO------ Starting at port', port);
});