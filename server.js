// Package imports
const express = require('express');


// Module imports
const { port } = require('./config')
const homeRouter = require('./routes/home')
const ejs = require('ejs');

// Server
const app = express()

// Static
app.use(express.static('public'))

// Set engine
app.engine('ejs', ejs.renderFile)
app.set('view engine', 'ejs')

// Middlewares


// Routes
app.use(homeRouter)

// Run server
app.listen(port, () => console.log('==>', port))