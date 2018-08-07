const   express               = require("express"),
        mongoose              = require("mongoose"),
        passport              = require("passport"),
        bodyParser            = require("body-parser"),
        User                  = require("./models/user"),
        LocalStrategy         = require("passport-local"),
        passportLocalMongoose = require("passport-local-mongoose");
   
mongoose.connect("mongodb://localhost/auth_demo_app");

const app = express();
app.set("view engine", "ejs");
app.use(require("express-session")({
    secret:"Lemmy is the king of Rock'n'roll",
    resave:false,
    saveUninitialized:false
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ===========
// ROUTES
// ===========

 const isLoggedIn = (req,res,next) => {
    req.isAuthenticated() ? 
        (res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'),
        next() )
     :
    res.redirect("/login");
}

app.get("/",  (req,res) => {
    res.render("home");
});

app.get("/secret",isLoggedIn,  (req,res) => {
    res.render("secret");
});

// Auth Routes

// show signup form
app.get("/register",  (req,res) => {
    res.render("register");
});

// handling user signup
app.post("/register", (req,res) => {
    req.body.username;
    req.body.password;
    User.register(new User({username:req.body.username}),req.body.password,  (err,user) => {
        err ? 
            (console.log(err),
            res.render("register"))
            :
            passport.authenticate("local")(req,res,  () => {
                res.redirect("/secret");
            });  
    });
});

// LOGIN ROUTES
// render login form
app.get("/login", (req,res) => {
    res.render("login");
});
// login logic
app.post("/login",passport.authenticate("local",{
    successRedirect:"/secret",
    failureRedirect:"/login"
}),  (req,res) => {
    // body...
});

app.get("/logout",  (req,res) => {
    req.logout();
    res.redirect("/");
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))