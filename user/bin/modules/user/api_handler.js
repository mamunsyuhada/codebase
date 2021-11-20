const response = require('../../utils/response');
const CommandSchema = require('./repositories/command/schema');
const CommandDomain = require('./repositories/command/domain');
const QueryDomain = require('./repositories/query/domain');
const QuerySchema = require('./repositories/query/schema');

const registerUser = (req, res) => {
    return response.send({
        req, res,
        schema: CommandSchema.registerUser,
        domain: CommandDomain.registerUser
    });
};

const loginUser = (req, res) => {
    return response.send({
        req, res,
        schema: CommandSchema.loginUser,
        domain: CommandDomain.loginUser
    });
};

const updateUser = (req, res) => {
    return response.send({
        req, res,
        schema: CommandSchema.updateUser,
        domain: CommandDomain.updateUser
    });
};

const profilUser = (req, res) => response.send({ req, res, domain: QueryDomain.profilUser });

const deactivateAccount = (req, res) => response.send({ req, res, domain: CommandDomain.deactivateAccount });

const listUsers = (req, res) => {
    return response.send({
        req, res,
        schema: QuerySchema.listUsers,
        domain: QueryDomain.listUsers
    });
};

module.exports = {
    registerUser,
    loginUser,
    profilUser,
    updateUser,
    deactivateAccount,
    listUsers,
};