var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var bodyparser = require('body-parser');
var localstrategy = require('passport-local');
var passportlocalmongoose = require('passport-local-mongoose');
var User = require("./model/user");
var comm = require("./model/comment");

mongoose.connect("mongodb://localhost/appdemo",{useUnifiedTopology: true,useNewUrlParser: true,});

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

var port=3008;

let posts = [];
app.use(require("express-session")({
    secret: "rusty is best",
    resave : false,
    saveUninitialized: false
}));


app.set("view engine","ejs");
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req,res){
    res.render("home");
});

app.get("/signup",function(req,res){
    res.render("signup");
});

app.get("/help",function(req,res){
    res.render("help")
})
app.get("/song",function(req,res){
    res.render("song")
})

app.get("/falcon",isLoggedIn,function(req,res){
    
    res.render("falcon",{comment : posts});
})

app.post("/falcon",function(req,res){
    new comm({
        author: req.body.author,
        feedback: req.body.feedback
    }
    ).save(function(err,comm){
        if(err){
            console.log(err)
        }
        else{
            posts.push(comm)
    res.redirect("/falcon")
    console.log(posts)
        }
    })
    
})

app.post("/signup",function(req,res){
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err)
            return res.render("signup");
        }
            passport.authenticate("local")(req,res,function(){
           
                res.redirect("/falcon");
            });
        
    });
});

app.get("/login",function(req,res){
    res.render("login");
});


app.post("/login",passport.authenticate("local",{
    successRedirect: "/falcon",
    failureRedirect: "/login"
}),function(req,res){
    
});

app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

app.listen(port,function(){
    console.log("start");
})