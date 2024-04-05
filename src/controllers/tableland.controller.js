// Meme controllers
const tablelandService = require("../services/tableland.service");


const getTablelandUserMapping = async (req, res) => {
    try {
        const { address, networkId } = req.query;
        if (!address || !networkId) {
            return res.status(400).json({ message: "Network/Address is required!" })
        }
        let query = {}
        if (address) {
            query['address'] = address
        }
        if (networkId) {
            query['networkId'] = parseInt(networkId)
        }
        const popularMemes = await tablelandService.getTablelandUserMapping(query);
        res.send(popularMemes);
    } catch (error) {
        return res.status(400).json({ message: "Unhandled exceptions", error: error?.message })
    }
};

const createTablelandUserMapping = async (req, res) => {
    try {
        console.log(req.params, "req");
        const { networkId, address, tableName } = req.body;
        if (!networkId || !address || !tableName) {
            return res.status(400).json({ message: "Network/Address/Table is required!" })
        }
        console.log('👉🏻 Line 32 : ', networkId);
        console.log('👉🏻 Line 33 : ', address);
        console.log('👉🏻 Line 34 : ', tableName);


        const newDownloads = await tablelandService.addTableland({ networkId, address, tableName });
        res.send(newDownloads);
    } catch (error) {
        return res.status(400).json({ message: "Unhandled exceptions", error: error?.message })
    }


};

module.exports = {
    getTablelandUserMapping,
    createTablelandUserMapping
}