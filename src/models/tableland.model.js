const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TablelandSchema = Schema({
    address: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    networkId: {
        type: mongoose.Schema.Types.Number,
        required: true
    },
    tableName: {
        type: mongoose.Schema.Types.String,
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("tableland_user_mappings", TablelandSchema);