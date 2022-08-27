const express =  require('express');
const app = express();
const path =  require('path');
const session =  require('express-session');
const MongoStore = require('connect-mongo');
const passport =  require('passport');
const localStrategy =  require('passport-local');
const User =  require('./models/user');
const flash =  require('connect-flash');
const { isLoggedIn } =  require('./middleware');
const authRoutes = require('./routes/authRoutes');
const index = require('./routes/index');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');

// const postsApiRoute = require('./routes/api/posts'); //requing the posts.js route

const mongoose = require('mongoose');
// const passport = require('passport');
mongoose.connect('mongodb://localhost:27017/shopping')
.then(()=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log(err);
})

app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname,'/views'));
app.use(express.static(path.join(__dirname , '/public')));
app.use(express.urlencoded({extended:true}));  // helps you to get the form data inside console
app.use(express.json());  // helps you to get the json data inside console


app.use(session({
    secret: 'we need a better secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: 'mongodb://localhost:27017/shopping'}),
    cookie: { maxAge: 180* 60 * 1000 }
    // cookie: { secure: true }
  }))


  //flash 
  app.use(flash());
  app.use(cookieParser());
  //make use of my sessions (login /logout) 
  app.use(passport.session());
  //used for initializing the passport
  app.use(passport.initialize());
//   authenticating theuser
  passport.use(new localStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());


//using the routes here
app.use(authRoutes);
app.use(index);

app.use(function(req,res,next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.get('/', isLoggedIn ,(req,res)=>{
    // res.send("welcome to twitter clone");
    
        res.render('layouts/main-layout');
   
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
  });
  
  // error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

app.listen(3030,()=>{
    console.log("server running on 3030");
})