const redis = require('redis');
const client = redis.createClient("6379","192.168.116");

module.exports = client
