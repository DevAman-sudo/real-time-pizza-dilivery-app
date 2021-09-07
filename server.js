// npm pacakges
const express = require('express');
const app = express();
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 5000;

// file paths
const viewsPath = path.join(__dirname , '/resources/views');
const staticPath = path.join(__dirname , './public');

// assets
app.use(express.static(staticPath));

// set template engine
app.set('views' , viewsPath);
app.set('view engine' , 'ejs');
app.use(expressLayout);

// web routes
require('./routes/web')(app);

// listening on server 5000
app.listen(port , () => {
    console.log(`app is listening on port ${port}`);
});