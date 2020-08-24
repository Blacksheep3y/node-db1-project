const express = require("express") // import express
const router = express.Router() //import the router from express method
const db = require('../data/dbConfig'); //import database

router.get('/', (req, res) => {
    //get data from the DataBase
    //select * from accounts
    db.select('*').from('accounts')
        .then(info => {
            res.status(200).json({ data: info });
        })
        .catch(error => {
            res.status(500).json({ message: "sorry, something went wrong retrieving the data." });
        })
})

router.get('/:id', (req, res) => {
    db('accounts')
        .where({ id: req.params.id })
        .first()
        .then(accounts => {
            if (accounts) {
                res.status(200).json({ data: accounts });
            } else {
                res.status(404).json({ message: "Account could not be found" });
            }
        })
        .catch(error => {
            console.log("There is an error in your get ID request.", error);
            res.status(500).json({ message: "sorry, there was an error returning the data." });
        })
});

router.post('/', (req, res) => {
    db('accounts').insert(req.body, "id")
        .then(ids => {
            res.status(201).json({ results: ids })
        })
        .catch(error => {
            res.status(500).json({ message: "sorry, There was an error somewhere in the code" });
        })
});


router.put('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id })
        .update(req.body) //updates the records
        .then(count => {
            if (count > 0) {
                res.status(200).json({ Message: "record updated successfully" })
            } else {
                res.status(404).json({ message: "Unable to update record" })
            }
        })
});

router.delete('/:id', (req, res) => {
    db('accounts').where({ id: req.params.id })
        .del() //deletes the records
        .then(count => {
            if (count > 0) {
                res.status(200).json({ Message: "record deleted successfully" })
            } else {
                res.status(404).json({ message: "Sorry could not delete record" })
            }
        })
});

module.exports = router;