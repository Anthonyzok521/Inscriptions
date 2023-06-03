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

    buildCollection(firstName, lastName, password, ci, phone, email, status) {
        return {
            firstName, 
            lastName, 
            password, 
            ci, 
            phone, 
            email, 
            status
            /* createdAt: new Date() */
        }
    }

    async insertData(data) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.getConnectionString(), { useNewUrlParser: true }).then(client => {

                const db = client.db(this.getDataBaseString());
                const collection = db.collection(this.getCollectionString());

                collection.insert(data, (insertError, insertResponse) => {
                    if (insertError) reject(insertError);
                    resolve(insertResponse);
                });

            }).catch(err => {
                console.error("Error al conectarse con la base de datos: ", err);
            });
        });
    }

    async insert(firstName, lastName, password, ci, phone, email, status){
        let data = this.buildCollection(firstName, lastName, password, ci, phone, email, status);
        console.log(data);
        return await this.insertData(data);
    }

}