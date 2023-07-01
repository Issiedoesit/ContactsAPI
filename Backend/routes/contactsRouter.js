const express = require('express')

const Contacts = require("./../models/contactsModel")

const router = express.Router()

router.get('/', async (req, res) => {

   try{
        const contacts = await Contacts.find()
        res.status(200).json({message: "Successfully gotten all contacts", contacts : contacts});
   }catch {
        res.status(500).json({message: "Error on the database"})
   }
})

router.post('/add', async (req, res) => {


    const {name, email, phone} = req.body

    if(!name || !email || !phone){
        res.status(400).json({message:"All fields are required"})
    }

    const contact = await Contacts.create({
        name,
        email,
        phone
    })

    if (contact) {
        res.status(201).json({message: "Successfully created new contact", contact : contact})
    }else{
        res.status(404).json({message: "Error creating Contact"})
    }



    // console.log("New Contact: ", contact)
    

    // res.status(201).json(contact);
})

router.get('/:id', async (req, res) => {
    const id  = req.params.id;
    
    try{
        const contact = await Contacts.findById(id)
        if(contact){
            res.status(200).json({message: "Successfully fetched contact", contact : contact})
        }else{
            res.status(404).json({message: "Contact doesn't exist"});
        }
    }catch{
        res.status(404).json({message: "Contact not found"});
    }
    
})

router.put('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const updatedContact = await Contacts.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        )
        res.status(200).json({message: "Successfully updated contact", contact : updatedContact})
    }catch{
        res.status(404).json({message: "Contact not found"});
    }
})

router.delete('/:id', async (req, res) => {
    const id = req.params.id
    try{
        const deletedContact = await Contacts.findOneAndDelete(id)
        res.status(200).json({message: "Successfully deleted contact", contact : deletedContact})
    }catch{
        res.status(404).json({message: "Contact not found"});
    }
})

module.exports = router