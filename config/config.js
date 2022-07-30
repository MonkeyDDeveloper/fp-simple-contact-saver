if(process.env.ENV != "production") {
    require('dotenv').config();
}
module.exports = {
    DB_URL: process.env.DATABASE_URL,
    PORT: process.env.PORT || 3000,
    ENV: process.env.ENV
}