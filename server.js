const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')
const todoRoutes = require('./routes/todos')
//CALENDAR - new in production
const calendarRoutes = require('./routes/calendar')
//NEW method overide
const methodOverride = require("method-override");

require('dotenv').config({path: './config/.env'})

// Passport config
require('./config/passport')(passport)

connectDB()

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(logger('dev'))
// Sessions
app.use(
    session({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: false,
      store: new MongoStore({ mongooseConnection: mongoose.connection }),
    })
  )

//Use forms for put / delete
app.use(methodOverride("_method"));
  
// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
  
app.use('/', mainRoutes)
app.use('/todos', todoRoutes)
//CALENDAR - new use in production
app.use('/calendar', calendarRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    
//Not sure if this last bit is needed go back to original MVC code to see if this is in it -- if not DELETE THIS
app.set("view-engine", "ejs");
const path = require('path');
__dirname = path.resolve();
app.use(express.static((path.join(__dirname, 'views'))));