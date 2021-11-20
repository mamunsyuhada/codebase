require('dotenv').config();

module.exports = {
    port: process.env.PORT,
    mongourl: process.env.MONGO_DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET,
    jwtExpired: process.env.JWT_EXPIRED,
};