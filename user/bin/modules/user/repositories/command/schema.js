const registerUser = {
    email: { type: 'email', required: true },
    password: { type: 'string', required: true, min: 6 },
    full_name: { type: 'string', optional: true },
};

const loginUser = { email: { type: 'email' }, password: { type: 'string', min: 6 } };

const updateUser = {
    email: { type: 'email', optional: true },
    password: { type: 'string', optional: true },
};

module.exports = {
    registerUser,
    loginUser,
    updateUser,
};
