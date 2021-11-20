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

const userType = {
    customer: 'customer',
    admin: 'admin'
};

module.exports = { allRoles, userType };