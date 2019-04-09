const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const helmet = require('helmet');
const compression = require('compression');
const app = express();


app.use(require('./middlewares/allow_requests'));

app.use(helmet());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use("/", require("./routes/convert"));

app.listen(3000,function(){
    console.log("Server is  Running");
});
   

