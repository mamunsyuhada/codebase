const jwt = require('jsonwebtoken');
const Validator = require('fastest-validator');
const { jwtSecret, jwtExpired } = require('../helpers/infra');
const { wrapper, err, ErrorResponsesCode } = require('../utils/response');
const User = require('../models/users');

const v = new Validator();

const encode = (user_id, expiresIn = jwtExpired) => {
    return {
        token: jwt.sign( { user_id }, jwtSecret, { expiresIn }),
        expiresIn
    };
};

const decode = async(req, res, next) => {
    const isValid = v.validate(req.headers, { authorization:'string|min:100' });
    if(isValid.length){
        return wrapper(res, err({ message: isValid }));
    }
    try {
        const { user_id } = jwt.verify(req.headers.authorization.split(' ')[1], jwtSecret);
        const user = JSON.parse(JSON.stringify(await User.findOne({ user_id, is_deleted: false })));
        if(user===null){
            return wrapper(res, err({ message: 'unknown user', code: ErrorResponsesCode.Forbidden }), ErrorResponsesCode.Forbidden);
        }
        req.user = user;
    } catch (error) {
        return wrapper(res, err({ message: error.message, code: ErrorResponsesCode.Forbidden }), ErrorResponsesCode.Forbidden);
    }
    return next();
};

module.exports = { encode, decode };