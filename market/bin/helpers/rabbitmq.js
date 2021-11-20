const jackrabbit = require('jackrabbit');

const rabbit = jackrabbit('amqp://user:rahasia@localhost');
const exchange = rabbit.default();

const publish = (message, topic) =>{
   exchange.publish(message, { key: topic }).on('drain', rabbit.close);
};

const consume = (topics) => {
   topics.forEach(({topic, event}) => {
      exchange.queue({ name: topic }).consume(event, { noAck: true });
      console.log("RabbitMQ - Consume at", `\'${topic}\'`);
   });
};


module.exports = {
   publish,
   consume
};