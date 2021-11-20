const Validator = require('fastest-validator');
const v = new Validator();

const ErrorResponsesCode = {
    BadRequest : 400,
    Unauthorized: 401,
    Forbidden: 403,
    NotFound: 404,
    NotAllowed: 405,
    Conflict: 409
};

const OkResponsesCode = {
    Ok: 200,
    Created: 201,
    Deleted: 202,
    NoContent: 204,
};

const err = ({code=ErrorResponsesCode.BadRequest, message='somethings get error'}) => {
    return { err: true, data: null, code, message};
};

const ok = ({data='', code=OkResponsesCode.Ok, message='your request is success'}) => {
    return {err: null, data, code, message,};
};

const wrapper = (res, payload, code=OkResponsesCode.Ok) => {
    return res.status(code).send(payload);
};

const send = async ({req, res, domain, schema={}}) => {
    let payload = { ...req.body, ...req.params, ...req.query };
    if(req.user!==undefined){
        payload.user = req.user;
    }
    if(payload.q){
        try {
            payload.q = JSON.parse(payload.q);
        } catch (e) {
            return wrapper(res, err({ message: `invalid query : ${e.message}` }));
        }
    }
    if(payload.sort){
        try {
            payload.sort = JSON.parse(payload.sort);
        } catch (e) {
            return wrapper(res, err({ message: `invalid query : ${e.message}` }));
        }
    }

    const isValid = v.validate(payload, schema);
    if(isValid.length){
        return wrapper(res, err({ message: isValid }));
    }
    payload = JSON.parse(JSON.stringify(payload));
    const data = await domain(payload);

    return wrapper(res, data, data.code);
};

module.exports = {
    ok,
    err,
    send,
    ErrorResponsesCode,
    OkResponsesCode,
    wrapper,
};
