import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {UserSchema} from '../models/userModel';

const User = mongoose.model("User", UserSchema);

export const loginRequired = (req, res, next) => {
    if(req.user){
        next();
    } else { 
        return res.status(401).json({
            message:'Unauthenorized user!'
        });
    }
} 

export const register = (req, res) => {
    const newUser = new User(req.body);
    newUser.password = bcrypt.hashSync(req.body.password, 10);
    newUser.save().then((user) => {
        user.password = undefined;
        return res.json(user);
    }).catch((err) => {
        if(err) {
            return res.status(400).send({ 
                message: err
            });
        }
    });
}

export const login = (req, res) => {
    User.findOne({
        email: req.body.email
    }).then((user) => {
        if(!user) {
            res.status(401).json({ 'message': 'Authentication failed. User not found.' });
        } else if(user) {
            if(!user.comparePassword(req.body.password, user.password)) {
                res.status(401).json({ 'message': 'Authentication failed. wrong password.' });
            } else {
                return res.json({token: jwt.sign({ _id: user._id, username: user.username, email: user.email }, process.env.JWT_SECRET)});
            }
        }

    }).catch((err) => {
        throw err;
    });
}
