const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = Schema({
    // name: {
    //     type: mongoose.Schema.Types.String,
    //     required: true
    // },
    // email: {
    //     type: mongoose.Schema.Types.String,
    //     required: true
    // },
    ethAddress: { // Renamed from userAddress to ethAddress
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true // Assuming each Ethereum address is unique per user
    },
    farCasterId: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    Imagelink: {
        type: mongoose.Schema.Types.String,
        default: ""
    },
    admin: {
        type: mongoose.Schema.Types.Boolean,
        default: false
    }
});

module.exports = mongoose.model("user", UserSchema);