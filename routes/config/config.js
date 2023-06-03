require('dotenv').config
const config = {
    mongo: {
        url: process.env.URL, // => url de conexión mongo
        database: process.env.DB,
        collection: COLLECTION
    }
}

module.exports = config;