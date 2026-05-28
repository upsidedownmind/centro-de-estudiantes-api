
const { MongoClient, ObjectId } = require('mongodb');

let client;
let db;

async function getDb() {
    if (!db) {
        const url = process.env.MONGODB_URL;
        if (!url) throw new Error('MONGODB_URL no está definida');
        client = new MongoClient(url);
        await client.connect();
        db = client.db();
    }
    return db;
}

function toPublic(doc) {
    if (!doc) return null;
    const { _id, ...rest } = doc;
    return { id: _id.toHexString(), ...rest };
}

module.exports = {

    async find(user, entity, id) {
        console.log('find', user, entity, id);
        const database = await getDb();
        const col = database.collection(entity);
        if (id) {
            const doc = await col.findOne({ _id: new ObjectId(id), owner: user });
            return doc ? [toPublic(doc)] : [];
        }
        const docs = await col.find({ owner: user }).toArray();
        return docs.map(toPublic);
    },

    async create(user, entity, data) {
        const database = await getDb();
        const col = database.collection(entity);

        const count = await col.countDocuments({ owner: user });
        if (count >= 500) {
            const err = new Error(`Límite de registros alcanzado para '${entity}'`);
            err.code = 'LIMIT_EXCEEDED';
            throw err;
        }

        const newItem = { ...data, owner: user };

        if (Buffer.byteLength(JSON.stringify(newItem), 'utf8') > 80 * 1024) {
            const err = new Error(`El item excede el tamaño máximo permitido de 80KB para '${entity}'`);
            err.code = 'PAYLOAD_TOO_LARGE';
            throw err;
        }

        const result = await col.insertOne(newItem);
        return { id: result.insertedId.toHexString(), ...data, owner: user };
    },

    async update(user, entity, id, data) {
        console.log('update', user, entity, id);
        const database = await getDb();
        const col = database.collection(entity);

        const existing = await col.findOne({ _id: new ObjectId(id), owner: user });
        if (!existing) return null;

        const { _id, ...existingData } = existing;
        const updated = { ...existingData, ...data, owner: user };
        delete updated._id;
        delete updated.id;
        if (Buffer.byteLength(JSON.stringify(updated), 'utf8') > 80 * 1024) {
            const err = new Error(`El item excede el tamaño máximo permitido de 80KB para '${entity}'`);
            err.code = 'PAYLOAD_TOO_LARGE';
            throw err;
        }

        await col.replaceOne({ _id: new ObjectId(id) }, updated);
        return { id, ...updated };
    },

    async delete(user, entity, id) {
        const database = await getDb();
        const col = database.collection(entity);
        const res = await col.deleteOne({ _id: new ObjectId(id), owner: user });
        return res.deletedCount > 0;
    },

};
