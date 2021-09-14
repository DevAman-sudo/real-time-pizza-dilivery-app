// npm pacakges
require('dotenv').config();
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require('connect-mongo');
const port = process.env.PORT || 8080;

// file paths
const viewsPath = path.join(__dirname , '/resources/views');
const staticPath = path.join(__dirname , './public');

// mongodb database connection
// const databaseUrl = "mongodb://localhost/pizza";
const databaseUrl = `mongodb+srv://DevAman:${process.env.PASS}@cluster0.tlrz1.mongodb.net/pizza?retryWrites=true&w=majority`;
mongoose.connect( databaseUrl ,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useFindAndModify: true,
        // useCreateIndex: true
    }).then(() => {
        console.log('database connected');
    }).catch((error) => {
        console.log(`error occured while database connection => ${error}`);
    });

// express session
app.use( session({
    secret: process.env.COOKIE_SECRET ,
    resave: false,
    saveUninitialized: true,
    store: MongoDbStore.create({
        mongoUrl: databaseUrl
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

app.use(flash());

// assets
app.use(express.static(staticPath));

// set template engine
app.set('views' , viewsPath);
app.set('view engine' , 'ejs');
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use(expressLayout);

// global middlewares
app.use( (req , res , next) => {
    res.locals.session = req.session;
    next();
})

// web routes
require('./routes/web')(app);

// listening on server 5000
app.listen(port , () => {
    console.log(`app is listening on port ${port}`);
});