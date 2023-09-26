import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import DBconnection from './database/DBconnection.js';
import helmet from 'helmet';
import cacheMiddleware from './middlewares/cachingMiddleware.js';
import AuthRoute from './routes/auth.js';
import OrderRoute from './routes/order.js';
import handleError from './utils/ReturnError.js';
import Users from './database/models/User.js';
import Drivers from './database/models/Driver.js';
import Orders from './database/models/Order.js';
import Files from './database/models/File.js';
import ReviewRoute from './routes/review.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false
    }
    return compression.filter(req, res)
}

app.use(compression({ filter: shouldCompress }));
dotEnv.config();

cacheMiddleware();

DBconnection();

app.use('/auth', AuthRoute);
app.use('/order', OrderRoute);
app.use('/review', ReviewRoute);

app.get('/data', async (req, res) => {
    try {

        let customers = await Users.find({});
        let drivers = await Drivers.find({});
        let orders = await Orders.find({});
        let files = await Files.find({});

        return res.status(200).json({ customers, drivers, orders, files })

    } catch (error) {
        let response = handleError(error);
        return res.status(response.statusCode).json(response.body);
    }
})

app.get('/', (req, res) => {
    return res.status(200).json({ msg: "hellow" })
})

app.listen(3001, '0.0.0.0', () => {
    console.log('server is live')
})