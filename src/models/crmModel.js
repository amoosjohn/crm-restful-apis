import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const STATUS = ['Pending','Approved','Rejected','Closed'];

export const ContactSchema = new Schema({
    firstName:{
        type: String,
        required: 'Enter your first name'
    },
    lastName:{
        type: String,
        required: 'Enter your last name'
    },
    email:{
        type: String,
        required: 'Enter your email'
    },
    company:{
        type: String
    },
    phone:{
        type: Number
    },
    status:{
        type: String,
        enum: STATUS,
        default: 'Pending'
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});