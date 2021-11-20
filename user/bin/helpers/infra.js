require('dotenv').config();

module.exports = {
    port: process.env.APP_PORT,
    mongourl: process.env.MONGO_DATABASE_URL,
    saltRounds: Number(process.env.SALT_ROUND_BCRYPT),
    jwtSecret: process.env.JWT_SECRET,
    jwtExpired: process.env.JWT_EXPIRED,
    emailAdmin: process.env.EMAIL_ADMIN,
    passwordAdmin: process.env.PASSWORD_ADMIN
};