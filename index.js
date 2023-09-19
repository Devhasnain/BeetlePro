const dotEnv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./controllers/auth");
const PublicRouter = require("./controllers/public");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
dotEnv.config();

// app.get('/',(req,res)=>{
//     let token = req.headers.authorization
// })

app.use('/data', PublicRouter);
app.use('/auth', AuthRouter);


app.listen(3000, () => {
    console.log('server is live')
})