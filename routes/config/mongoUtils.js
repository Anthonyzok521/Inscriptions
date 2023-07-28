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

    buildCollection(firstName, lastName, ci, phone, email, student, season, ip) {
        return {
            firstName,
            lastName,
            ci,
            phone,
            email,
            student,
            season,
            ip
            /* createdAt: new Date() */
        }
    }

    buildCollectionPago(firstName, lastName, ci, reference, pago) {
        return {
            firstName,
            lastName,
            ci,
            reference,
            pago
            /* createdAt: new Date() */
        }
    }

    buildCollectionFind(ci) {
        return {
            ci
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

    async insertDataPago(data) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.getConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {

                const db = client.db(this.getDataBaseString());
                const collection = db.collection('pagos');

                collection.insertOne(data, (insertError, insertResponse) => {
                    if (insertError) reject(insertError);
                    resolve(insertResponse);
                });

            }).catch(err => {
                console.error("Error al conectarse con la base de datos: ", err);
            });
        });
    }

    async insert(firstName, lastName, ci, phone, email, student, season, ip) {
        let data = this.buildCollection(firstName, lastName, ci, phone, email, student, season, ip);
        console.log(data);
        return await this.insertData(data);
    }

    async insertPago(firstName, lastName, ci, reference, pago) {
        let data = this.buildCollectionPago(firstName, lastName, ci, reference, pago);
        console.log(data);
        return await this.insertDataPago(data);
    }

    async findData(data) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.getConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {

                const db = client.db(this.getDataBaseString());
                const collection = db.collection(this.getCollectionString());

                const find = collection.find(data);

                find.each((err, doc) => {
                    if (err) reject(err);
                    resolve(doc);
                });

            }).catch(err => {
                console.error("Error al conectarse con la base de datos: ", err);
            });
        });
    }

    async findDataPago(data) {
        return new Promise((resolve, reject) => {
            mongoClient.connect(this.getConnectionString(), { useUnifiedTopology: true, useNewUrlParser: true }).then(client => {

                const db = client.db(this.getDataBaseString());
                const collection = db.collection('pagos');

                const find = collection.find(data);

                find.each((err, doc) => {
                    if (err) reject(err);
                    resolve(doc);
                });

            }).catch(err => {
                console.error("Error al conectarse con la base de datos: ", err);
            });
        });
    }

    async find(ci) {
        let data = this.buildCollectionFind(ci);
        //console.log(data);
        return await this.findData(data);
    }

    async findPago(ci) {
        let data = this.buildCollectionFind(ci);
        //console.log(data);
        return await this.findDataPago(data);
    }
}