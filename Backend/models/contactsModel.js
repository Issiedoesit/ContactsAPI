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
        required: true,
        default:"https://res.cloudinary.com/issie/image/upload/v1688227224/memojis/female-memoji-1.jpg",
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