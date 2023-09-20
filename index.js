const express = require("express");
const dotEnv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectToDatabase = require("./database/DBconnection");
const cacheMiddleware = require("./middlewares/cachingMiddleware");
const app = express();


const AuthRoute = require('./routes/auth');
const OrderRoute = require('./routes/order');

const TestRouter = require('./routes/test');
const PublicRouter = require('./controllers/public/getUsers');
const ServeImage = require("./controllers/public/ServeImage");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotEnv.config();

cacheMiddleware();

connectToDatabase();

app.use('/auth', AuthRoute);
app.use('/order', OrderRoute);
app.use('/data', PublicRouter);
app.use('/test', TestRouter);
app.get('/image/:id', ServeImage);


app.listen(3000, () => {
    console.log('server is live')
})