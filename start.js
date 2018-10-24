const mysql = require('mysql');
const express = require('express');
const validator = require('express-validator');
const bodyParser = require('body-parser');
const session = require('express-session');
const socket = require('socket.io');
const cookieParser = require('cookie-parser');
const memory = require("memory");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const app = express();

app.use(express.static(__dirname + '/Library'))

app.set('view engine', 'ejs');
app.set('views', (__dirname + '/Library'));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}))

app.use(validator());
app.use(session({
    secret: "asfsdafgwrajgklaio",
    saveUninitialized: false,
    resave: false
}))


const server = app.listen(process.env.PORT || 3000, (err) => {
    if (err) return new Error('Something went wrong!')
    console.log('App is running... listening on port 3000')
})

 
app.get("/request/:requestType/key/:product_key/username/:username/password/:password", (req, res) => {
    console.log(req.params);
});