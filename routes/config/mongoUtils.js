const mongoClient = require("mongodb").MongoClient;
const config = require("./config");

module.exports = class MongoUtils {
    getConnectionString() {
        return config.mongo.url;
    }

    getDataBaseString() {
        return config.mongo.database;
    }

    getCollectionString() {
        return config.mongo.collection;
    }

    buildCollection(firstName, lastName, ci, phone, email, student, season) {
        return {
            firstName, 
            lastName, 
            ci, 
            phone, 
            email, 
            student,
            season
            /* createdAt: new Date() */
        }
    }

    async insertData(data) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.getConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {

                const db = client.db(this.getDataBaseString());
                const collection = db.collection(this.getCollectionString());

                collection.insertOne(data, (insertError, insertResponse) => {
                    if (insertError) reject(insertError);
                    resolve(insertResponse);
                });

            }).catch(err => {
                console.error("Error al conectarse con la base de datos: ", err);
            });
        });
    }

    async insert(firstName, lastName, ci, phone, email, student, season){
        let data = this.buildCollection(firstName, lastName, ci, phone, email, student, season);
        console.log(data);
        return await this.insertData(data);
    }

}