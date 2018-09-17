const express = require('express')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')
const mongoose = require('mongoose')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
const passport = require('passport')


// Create the express app
const app = express()

// set up view engine
app.set('view engine', 'ejs')

// set up the cookieSession
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))

// initialize passport
app.use(passport.initialize())
app.use(passport.session())

// connect to mongodb
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log('connected to mongodb')
})

// set up routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

// Create home route
app.get('/', (req, res) => {
    res.render('home', { user: req.user })
})

// start server on port 5000
app.listen(5000, () => {
    console.log('App now listening on port 5000')
})