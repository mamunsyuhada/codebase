const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    user_type: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    full_name: { type: String, default: '' },
    roles: { type: [String], default: [] },
    login_count: { type: Number, default: 0},
    is_deleted: { type: Boolean, required: true, default: false },
    created_by: { type: String, required: true },
    modified_by: { type: String, required: true },
    created_at: { type: Date, required: true },
    modified_at: { type: Date, required: true }
}, { versionKey: false, timestamps: false});

module.exports = mongoose.model('users', UserSchema);