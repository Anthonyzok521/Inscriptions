require('dotenv').config()
const config = {
    mongo: {
        url: process.env.URI, // => url de conexión mongo
        database: process.env.DB,
        collection: process.env.COLLECTION
    }
}

module.exports = config;
