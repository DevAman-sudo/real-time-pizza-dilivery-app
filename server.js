// npm pacakges
const express = require('express');
const app = express();
const ejs = require('ejs');

const port = process.env.PORT || 5000;

// listening on server 5000
app.listen(port , () => {
    console.log(`app is listening on port ${port}`);
});