const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    product_id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    weight: { type: Number, required: true },
    description: { type: String, optional: true, default: '' },
    is_deleted: { type: Boolean, required: true, default: false },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
    created_at: { type: Date, required: true },
    modified_at: { type: Date, required: true }
}, { versionKey: false, timestamps: false});

module.exports = mongoose.model('products', ProductSchema);