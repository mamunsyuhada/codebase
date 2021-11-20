const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const userApiHandler = require('./modules/user/api_handler');
const jwt = require('./middlewares/jwt');
const checkRole = require('./middlewares/check_role');
const { allRoles } = require('./helpers/common');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(_, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

/** User Router **/
app.post('/user/register', userApiHandler.registerUser);
app.post('/user/login', userApiHandler.loginUser);
app.get('/user', jwt.decode, checkRole(allRoles.getProfil), userApiHandler.profilUser);
app.put('/user', jwt.decode, checkRole(allRoles.updateProfil), userApiHandler.updateUser);
app.delete('/user', jwt.decode, checkRole(allRoles.deactivateAccount), userApiHandler.deactivateAccount);

/** Admin Router **/
app.get('/user/admin', jwt.decode, checkRole(allRoles.listUsers), userApiHandler.listUsers);

module.exports = app;