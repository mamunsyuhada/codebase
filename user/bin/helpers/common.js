const allRoles = {
    /* Product */
    addProduct: 'add-product',
    deleteProduct: 'delete-product',
    updateProduct: 'update-product',
    listProduct: 'list-product',
    getProduct: 'get-product',
    saveProduct: 'save-product',
    unsaveProduct: 'unsave-product',
    /* User */
    getProfil: 'get-profile',
    updateProfil: 'update-profile',
    deactivateAccount: 'deactivate-account',
    listUsers: 'list-users',
};

const adminRoles = {
    /* Product */
    addProduct: allRoles.addProduct,
    updateProduct: allRoles.updateProduct,
    deleteProduct: allRoles.deleteProduct,
    listProduct: allRoles.listProduct,
    getProduct: allRoles.getProduct,
    /* Users */
    listUsers: allRoles.listUsers,
};

const customerRoles = {
    /* Product */
    listProduct: allRoles.listProduct,
    /* Users */
    getProfil: allRoles.getProfil,
    updateProfil: allRoles.updateProfil,
    deactivateAccount: allRoles.deactivateAccount,
};

const userType = {
    customer: 'customer',
    admin: 'admin'
};

module.exports = { allRoles, userType, customerRoles, adminRoles };