const mongoose = require('mongoose');
const { mongourl } = require('./infra');

module.exports = {
    connect: () => {
        mongoose.connect(mongourl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Successfully connected to the database", mongourl);
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
        });
    }
};