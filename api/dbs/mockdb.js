
const mockStore = {};
module.exports = {

    async _fetchFile(user, entity) {
        return mockStore[`${user}_${entity}`] || [];
    },

    async _updateFile(user, entity, data) {
        mockStore[`${user}_${entity}`] = data;
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