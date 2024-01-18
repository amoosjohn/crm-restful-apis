require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import routes from './src/routes/crmRoutes';

const app = express();
const PORT = process.env.PORT || 4000;

//moongoose connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI, { 
    useNewUrlParser:true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
//bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

//JWT setup
app.use((req, res, next) => {
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, decode) => {
            if(err) {
                req.user = undefined;
                return res.status(401).json({
                    message: 'Invalid token'
                });
            } else {
                req.user = decode;
                next();
            }
        });
    } else {
        req.user = undefined;
        next();
    }
});

routes(app);

app.get('/', (req, res) => {
    res.send(`Node server is running on port ${PORT}`);
});

app.listen(PORT, () => {
    console.log(`Node server is running on port ${PORT}`);
});