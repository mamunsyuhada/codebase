const addProduct = {
    name: { type: 'string', required: true },
    price: { type: 'number', required: true },
    stock: { type: 'number', required: true },
    weight: { type: 'number', required: true },
    description: { type: 'string', optional: true },
};

const deleteProduct = {
    product_id: { type: 'uuid', required: true },
};

const updateProduct = {
    product_id: { type: 'uuid', required: true },
    name: { type: 'string', optional: true },
    price: { type: 'number', optional: true },
    stock: { type: 'number', optional: true },
    weight: { type: 'number', optional: true },
    description: { type: 'string', optional: true },
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
};