import dotenv from 'dotenv'
dotenv.config()

module.exports = {
    port: process.env.PORT || 6000,
    host: process.env.HOST || "localhost",
    dbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/quick-bite",
    saltWorkFactor: process.env.SALTWORK_FACTOR || 10
};
