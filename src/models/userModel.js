import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    created_date:{
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = (inputPassword, password) => {
    return bcrypt.compareSync(inputPassword, password);
}