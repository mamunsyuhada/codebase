const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const jwt = require('./middlewares/jwt');
const checkRole = require('./middlewares/check_role');
const { allRoles } = require('./helpers/common');
const productApiHandler = require('./modules/product/api_handler');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(_, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/** Product Router **/
app.post('/market/product', jwt.decode, checkRole(allRoles.addProduct), productApiHandler.addProduct);
app.get('/market/product', jwt.decode, checkRole(allRoles.listProduct), productApiHandler.listProduct);
app.get('/market/product/:product_id', jwt.decode, checkRole(allRoles.getProduct), productApiHandler.getProduct);
app.put('/market/product/:product_id', jwt.decode, checkRole(allRoles.updateProduct), productApiHandler.updateProduct);
app.delete('/market/product/:product_id', jwt.decode, checkRole(allRoles.deleteProduct), productApiHandler.deleteProduct);

module.exports = app;