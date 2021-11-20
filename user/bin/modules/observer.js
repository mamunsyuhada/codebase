const rabbit = require('../helpers/rabbitmq');

const topics = [];

const init = () => {
    rabbit.consume(topics);
};

module.exports = { init };