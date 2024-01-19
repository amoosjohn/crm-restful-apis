import mongoose from 'mongoose';
import { ContactSchema } from '../models/crmModel';

const Contact = mongoose.model('Contact', ContactSchema);

export const addNewContact = (req, res) => {
    let newContact = new Contact(req.body);

    newContact.save().then((contact) => {
        res.json(contact);
    }).catch((err) => {
        res.send(err);
    });

};

export const getContacts = (req, res) => {
    let contacts =  Contact.find().sort({created_date: 'desc'});

    contacts.then((contact) => {
        res.json(contact);
    }).catch((err) => {
        res.send(err);
    });

};

export const getContactById = (req, res) => {

    Contact.findById(req.params.contactId).then((contact) => {
        res.json(contact);
    }).catch((err) => {
        res.send(err);
    });

};

export const updateContact = (req, res) => {

    Contact.findOneAndUpdate({_id : req.params.contactId}, req.body, {new:true})
    .then((contact) => {
        res.json(contact);
    }).catch((err) => {
        res.send(err);
    });

};

export const deleteContact = (req, res) => {

    Contact.deleteOne({_id : req.params.contactId})
    .then(() => {
        res.json({message : 'Contact deleted successfully'});
    }).catch((err) => {
        res.send(err);
    });

};