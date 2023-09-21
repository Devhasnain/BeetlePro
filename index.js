const dotEnv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const AuthRouter = require("./controllers/auth");
const PublicRouter = require("./controllers/public");
const compression = require('compression');
const connectToDatabase = require("./database/DBconnection");
const Upload = require("./functions/uploads/Upload");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(compression());
dotEnv.config();

// connectToDatabase();

app.use('/data', PublicRouter);
app.use('/auth', AuthRouter);

app.post('/',Upload.single("file"),(req,res)=>{
    return res.status(200).json(req.file)
})


app.listen(3000, () => {
    console.log('server is live')
})