const mongoose = require("mongoose");

const contactsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    dp:{
        type: String,
        default:"",
    },
    gender:{
        type: String,
        required: true,
        default: "female",
    },
    createdAt:{
        type:Date,
        required: true,
        default:Date.now
    }
})

module.exports = mongoose.model('Contacts', contactsSchema)