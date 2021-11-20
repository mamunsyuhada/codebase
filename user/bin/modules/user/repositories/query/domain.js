const { ok, OkResponsesCode } = require('../../../../utils/response');
const User = require('../../../../models/users');

const profilUser = (payload) => {
    const { user: data } = JSON.parse(JSON.stringify(payload));
    delete data.password;
    return ok({ data, message: 'success to get profil', code: OkResponsesCode.Ok });
};

const listUsers = async(payload) => {
    const { q } = payload;
    const aggr = [
        { $match: q },
        { $project: {
            _id: 0,
            user_id: 1,
            email: 1,
            full_name: 1,
        }},
    ];
    const costumer = await User.aggregate(aggr);
    return ok({ data: costumer, message: 'success to list users', code: OkResponsesCode.Ok });
};

module.exports = {
    profilUser,
    listUsers,
};