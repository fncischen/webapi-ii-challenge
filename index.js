const express = require('express');
const server = express();
const router = express.Router(); 

const data = require("./data/seeds/posts");

router.get( "/api/posts", (req, res) => {
    if(!data.find()){
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
    else {
        res.json(data.find());
    }
});

router.get( "/api/posts:id", (req, res) => {
    if(!data.find(req.params.id)){
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
    else {
        res.json(data.find(req.params.id));
    }
});

router.post( "/api/posts", (req, res) => {
    if(!req.body.title | !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else if (req.body.title != null & req.body.contents != null) {
        data.insert(req.body);
        res.status(201).json(req.body);
    }
});

router.delete( "/api/posts:id", (req, res) => {

});

router.put( "/api/posts:id", (req, res) => {

});