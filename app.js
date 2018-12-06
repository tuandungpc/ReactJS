var express = require("express");
var session = require('express-session');

var path = require("path");
var bodyParser = require("body-parser");
var user = require('./user');


var app = express();
app.use(session({
    secret: 'my-secret',
    resave: true,
    saveUninitialized: true
}));
var session;
app.use(express.static(path.join(__dirname,"/html")));

app.use(bodyParser.json());

app.get('/', function(req,res){
    res.sendFile(__dirname + '/html/index.html');
  })
  
  app.get('/home', function (req, res) {
    if(sessions && sessions.username){
      res.sendFile(__dirname + '/html/home.html');
    }
    else{
      res.send('unauthorized');
    }
  })

app.post('/signin', function(req, res) {
    var user_name=req.body.email;
    var password=req.body.password;
    
    user.validateSignIn(user_name,password, function(result){
        if(result){
            res.send('Success')
        }
        else{
            res.send('Wrong username password')
        }
    });   
})
app.post('/signup', function(req, res) {
   var name = req.body.name;
   var email = req.body.email;
   var password = req.body.password;
   if (name && email && password){
       user.signup(name, email, password)
   }
   else {
       res.send('FailureToInsert');
   }
})

app.listen(7777,()=>{
    console.log("Started listening on port", 7777);
})