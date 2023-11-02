import express from 'express';
import dotEnv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';
import DBconnection from './utils/DBconnection.js';
import helmet from 'helmet';
import cacheMiddleware from './middlewares/cachingMiddleware.js';
import AuthRoute from './routes/auth.js';
import OrderRoute from './routes/order.js';
import ReviewRoute from './routes/review.js';
import FaqsRoute from './routes/faq.js';
import morgan from 'morgan';
const app = express();

app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({
    verify: function (req, res, buf) {
        req.rawBody = buf;
    }
}));
function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        return false
    }
    return compression.filter(req, res)
};
app.use(compression({ filter: shouldCompress }));
app.use(morgan("tiny"));
dotEnv.config();
cacheMiddleware();
DBconnection();

app.use('/auth', AuthRoute);
app.use('/order', OrderRoute);
app.use('/review', ReviewRoute);
app.use('/faqs', FaqsRoute);

export default app;
