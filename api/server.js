const express = require("express"); // import express
const accountsRouter = require('../router/accounts') // import router

const db = require("../data/dbConfig.js"); // require database

const server = express(); // allow server to use express

server.use(express.json()); // convert express to json

// server.use('/api/accounts', accountsRouter) // set accounts router api to this endpoint to start

server.get('/', (req, res) => {
    res.status(200).json({ API: 'The API is Running!' })
}) // set base server endpoint and return a successful message

module.exports = server; // export server
