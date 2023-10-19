const express = require("express");
const ejs = require("ejs");
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const MongoDBURI = process.env.MONGO_URI || 'mongodb://localhost:27017/ManualAuth';

mongoose.connect(MongoDBURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(()=>console.log("connected"))

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
});

app.use(session({
  secret: 'anything',
  resave: true,
  saveUninitialized: false,
  store:  MongoStore.create({
    mongoUrl: MongoDBURI
  })
}));

const index = require('./routes/index');
app.use('/', index);

app.listen(3000, function() {
    console.log("Server started on port 3000");
});