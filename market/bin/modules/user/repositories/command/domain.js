const User = require('../../../../models/users');
const upsertUser = async(payload) => {
    const ctx = 'eventHandler-upsertUser';
    try {
        const { user_id } = payload;
        const user = await User.find({ user_id });
        user.length===0 ?
            await new User(payload).save():
            await User.findOneAndUpdate({ user_id }, payload, { new: true } );
    } catch (error) {
        console.error(`[${ctx}] :`, error.message);
    }
};

module.exports = { upsertUser };