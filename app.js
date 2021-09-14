
const express = require('express');
const app = express();
const cors = require("cors")
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require("morgan")
require('dotenv').config({ path: 'config/config.env' })
const errorMiddleware = require('./middlewares/error')
app.use(morgan("dev"))
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())


//Cors
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));

// Cors politikaları gereği
// Frontend üzerinde erişebileceğim header'ların adını
// Burada belirtmek zorundayım.
app.use((req, res, next) => {
    res.header({
        "Access-Control-Expose-Headers": 'Token'
    });
    next();
});



app.use(express.static(__dirname + '/public'));
//All routes
const user = require("./routes/userRoute")
const product = require('./routes/productRoute')
const news = require('./routes/newsAnnounRoute')
app.use("/api", user)
app.use("/api", product)
app.use("/api", news)
// Middleware to handle errors
app.use(errorMiddleware);

module.exports = app
