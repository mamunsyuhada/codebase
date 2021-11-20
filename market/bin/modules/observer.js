const rabbit = require('../helpers/rabbitmq');
const userEvent = require('./user/event_handler');

const topics = [
    { topic: "sejutacita.user", event: userEvent.upsertUser }
];

const init = () => rabbit.consume(topics);

module.exports = { init };