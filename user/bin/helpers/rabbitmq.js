const jackrabbit = require('jackrabbit');

const rabbit = jackrabbit('amqp://user:rahasia@localhost');
const exchange = rabbit.default();

const publish = async(message, topic) => {
   try {
      message = JSON.stringify(message);
      exchange.publish(message, { key: topic });
   } catch (error) {
      console.log("RabbitMQ - Publish Error at", `\'${topic}\'`, `error: ${error.message}`);
      return;
   }
   console.log("RabbitMQ - Publish Success at", `\'${topic}\'`);
};

const consume = async (topics) => {
   topics.forEach(({topic, event}) => {
      exchange.queue({ name: topic }).consume(event, { noAck: true });
      console.log("RabbitMQ - Consume at", `\'${topic}\'`);
   });
};


module.exports = {
   publish,
   consume
};