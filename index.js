const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const compression = require('compression');
const connectToDatabase = require("./database/DBconnection");

const cacheMiddleware = require("./middlewares/cachingMiddleware");
const app = express();


const AuthRoute = require('./routes/auth');
const OrderRoute = require('./routes/order');
const ReviewRoute = require('./routes/review');

const TestRouter = require('./routes/test');
const PublicRouter = require('./controllers/public/getUsers');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
dotEnv.config();

cacheMiddleware();

connectToDatabase();

app.use('/auth', AuthRoute);
app.use('/order', OrderRoute);
app.use('/review', ReviewRoute)

app.get('/', (req, res) => {
    return res.status(200).json({ msg: "hellow" })
})

app.use('/data', PublicRouter);
app.use('/test', TestRouter);

app.listen(() => {
    console.log('server is live')
})