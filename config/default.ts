import dotenv from 'dotenv'
dotenv.config()

module.exports = {
    port: process.env.PORT || 6000,
    host: process.env.HOST || "0.0.0.0",
    dbUri: process.env.MONGODB_URI || "mongodb://localhost:27017/quick-bite",
    saltWorkFactor: process.env.SALTWORK_FACTOR || 10,
    apiKey: process.env.SENDCHAMP_API_KEY,
    senderId: process.env.SENDCHAMP_SENDER_ID,
    baseUrl: process.env.SENDCHAMP_BASE_URL,
    gmailUser: process.env.GMAIL_APP_USER,
    gmailPassword: process.env.GMAIL_APP_PASSWORD,
    gmailName: process.env.MAIL_FROM_NAME
};

