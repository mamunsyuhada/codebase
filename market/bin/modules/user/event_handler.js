const validateEvent = require('../../utils/validate_event');
const CommandDomain = require('./repositories/command/domain');

const upsertUser = (payload) => {
    const ctx = 'eventHandler-upsertUser';
    const validate = validateEvent(payload);
    if(validate.error){
        console.error(`[${ctx}] error :`, validate);
        return;
    }
    CommandDomain.upsertUser(validate);
    console.log(`[${ctx}] was succed`);
};

module.exports = { upsertUser };