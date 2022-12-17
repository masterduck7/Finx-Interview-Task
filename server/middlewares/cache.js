require("dotenv").config();

const redis = require('redis')
const client = redis.createClient({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
})
client.connect();

module.exports = {
    client: client,
    checkCache: async function checkCache(variable) {
        const data = await client.get(variable);
        if (data) {
            return data;
        }
    }
}