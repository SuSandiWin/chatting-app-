var express= require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.port || 5005;
var session = require('express-session');
var cookieParser = require('cookie-parser');
var SessionStore = require('express-mysql-session');

var options = {
    host: 'localhost',
    port: 3306,
    database:'mydb',
	user: 'root',
	password : 'mysql',
	dateStrings: 'date'
};

var sessionStore = new SessionStore(options);

app.use(session({
    key: 'user_sid',
    secret: 'authenticate_secret',
    store: sessionStore,
    resave: true,
    saveUninitialized: true,
    cookie:{
        maxAge: 1000 * 60
    }
}));

app.use(cookieParser());
app.set('view engine','ejs');
app.use(express.static(__dirname+ '/public'));
// app.use(express.static(__dirname+ '/views'));

app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({limit: '10mb',extended: false}));
app.use(require('./controllers'));


app.listen(port, function(err){
    if(err) throw err;
    console.log("Server starts at "+ port);    
})

// module.exports = app;