require('dotenv').config()
console.log(process.env.URL)
const config = {
    mongo: {
        url: process.env.URL, // => url de conexión mongo
        database: process.env.DB,
        collection: process.env.COLLECTION
    }
}

module.exports = config;