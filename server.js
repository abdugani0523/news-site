// Package imports
const express = require('express');


// Module imports
const { port } = require('./config')
const ejs = require('ejs');
const homeRouter = require('./routes/home')
const adminRouter = require('./routes/admin')


// Server
const app = express()

// Set engine
app.engine('ejs', ejs.renderFile)
app.set('view engine', 'ejs')


// Static
app.use(express.static('public'))

// Routes
app.use(homeRouter)
app.use(adminRouter)

// Run server
app.listen(port, () => console.log('==>', port))