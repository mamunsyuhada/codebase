const response = require('../../utils/response');
const CommandSchema = require('./repositories/command/schema');
const CommandDomain = require('./repositories/command/domain');
const QuerySchema = require('./repositories/query/schema');
const QueryDomain = require('./repositories/query/domain');

const addProduct = (req, res) => {
    return response.send({
        req, res,
        schema: CommandSchema.addProduct,
        domain: CommandDomain.addProduct
    });
};

const updateProduct = (req, res) => {
    return response.send({
        req, res,
        schema: CommandSchema.updateProduct,
        domain: CommandDomain.updateProduct
    });
};

const deleteProduct = (req, res) => {
    return response.send({
        req, res,
        domain: CommandDomain.deleteProduct,
        schema: CommandSchema.deleteProduct,
    });
};

const listProduct = (req, res) => {
    return response.send({
        req, res,
        domain: QueryDomain.listProduct
    });
};

const getProduct = (req, res) => {
    return response.send({
        req, res,
        domain: QueryDomain.getProduct,
        schema: QuerySchema.getProduct,
    });
};

module.exports = {
    addProduct,
    updateProduct,
    listProduct,
    getProduct,
    deleteProduct,
};