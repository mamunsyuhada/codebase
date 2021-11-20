module.exports = (roleName) => {
    return function (req, res, next) {
        const { user } = req;
        const rolesUser = user.roles;
        if (rolesUser.indexOf(roleName) === -1) {
            return res.status(400).json({
                status: 'forbidden'
            });
        }
        delete user.roles;
        return next();
    };
};
