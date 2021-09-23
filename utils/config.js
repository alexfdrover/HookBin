require('dotenv').config();

const MONGODB_URI = `mongodb://${process.env.DB_HOST}:27017/http_request_bin`;

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI
};