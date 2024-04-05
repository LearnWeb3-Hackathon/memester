// Tableland Service

const Tableland = require("../models/tableland.model");


async function getTablelandUserMapping(query) {
    return (await Tableland.findOne(query).lean());
}

async function addTableland({ tableName, address, networkId }) {
    const query = { address, networkId };
    const update = { ...query, tableName };
    const options = { upsert: true };
    try {
        const savedTables = await Tableland.updateOne(query, update, options)
        return savedTables;
    } catch (error) {
        // Handle potential errors, such as validation errors or database connectivity issues
        throw error; // Rethrow the error to be handled by the caller
    }
}

module.exports = {
    getTablelandUserMapping,
    addTableland
};