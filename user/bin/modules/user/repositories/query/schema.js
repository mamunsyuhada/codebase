const { userType } = require('../../../../helpers/common');

const listUsers = {
    q: {
        type: 'object',
        optional: true,
        props: {
            user_type: { type: 'string', default:  userType.customer }
        }
    },
    sort: { type: 'object', optional: true }
};

module.exports = {
    listUsers,
};
