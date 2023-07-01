const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors');

mongoose.set('strictQuery', false);
mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = mongoose.connection

db.on('error', (error) => console.error(error) )

try {
    db.once('open', () => console.log('Connected to Database') );
} catch (error) {
    console.error(error);
}



const app = express()


const port = process.env.PORT || 3000

const contactsRouter = require('./routes/contactsRouter')

app.use(express.json())

app.use(cors())

app.use("/api/contacts", contactsRouter)



app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})