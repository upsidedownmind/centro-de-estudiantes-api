
const { put, list, del } = require('@vercel/blob');

const BLOB_PREFIX = 'db';

module.exports = {

    async _fetchFile(user, entity) {
        try {
            console.log('_fetchFile', user, entity);
            const { blobs } = await list({ pathname: `${BLOB_PREFIX}/${user}/${entity}.json` });
            console.log('_fetchFile', blobs);
            const blob = blobs.find(b => b.pathname === pathname);
            if (!blob) return [];
            const res = await fetch(blob.url);
            return res.json();
        } catch (e) {
            console.error(`Error al leer '${entity}': BLOB_READ_WRITE_TOKEN`, process.env.BLOB_READ_WRITE_TOKEN, e);
            const err = new Error(`Error de base de datos al leer '${entity}': ${e.message}`);
            err.code = 'DB_ERROR';
            throw err;
        }
    },

    async _updateFile(user, entity, data) {
        try {
            console.log('_updateFile', user, entity);
            const ok = await put(`${BLOB_PREFIX}/${user}/${entity}.json`, JSON.stringify(data), {
                access: 'public',
                allowOverwrite: true,
            });
            console.log('_updateFile', ok);
        } catch (e) {
            console.error(`Error al escribir '${entity}':`, e);
            const err = new Error(`Error de base de datos al escribir '${entity}': ${e.message}`);
            err.code = 'DB_ERROR';
            throw err;
        }
    },

    async find(user, entity, id) {
        const data = await this._fetchFile(user, entity);
        if (id) return data.filter(item => item.id === id);
        return data;
    },

    async create(user, entity, data) {
        const id = Math.floor(Math.random() * 10000000000);
        const existing = await this.find(user, entity);
        if (Array.isArray(existing) && existing.length > 200) {
            const err = new Error(`Límite de registros alcanzado para '${entity}'`);
            err.code = 'LIMIT_EXCEEDED';
            throw err;
        }
        const newItem = { ...data, id };
        if (Buffer.byteLength(JSON.stringify(newItem), 'utf8') > 80 * 1024) {
            const err = new Error(`El item excede el tamaño máximo permitido de 80KB para '${entity}'`);
            err.code = 'PAYLOAD_TOO_LARGE';
            throw err;
        }
        const records = await this._fetchFile(user, entity);
        records.push(newItem);
        await this._updateFile(user, entity, records);
        return newItem;
    },

    async update(user, entity, id, data) {
        const records = await this._fetchFile(user, entity);
        const index = records.findIndex(item => item.id === id);
        if (index === -1) return null;
        records[index] = { ...records[index], ...data };
        if (Buffer.byteLength(JSON.stringify(records[index]), 'utf8') > 80 * 1024) {
            const err = new Error(`El item excede el tamaño máximo permitido de 80KB para '${entity}'`);
            err.code = 'PAYLOAD_TOO_LARGE';
            throw err;
        }
        await this._updateFile(user, entity, records);
        return records[index];
    },

    async delete(user, entity, id) {
        const data = await this._fetchFile(user, entity);
        const index = data.findIndex(item => item.id === id);
        if (index === -1) return false;
        data.splice(index, 1);
        await this._updateFile(user, entity, data);
        return true;
    },

};
