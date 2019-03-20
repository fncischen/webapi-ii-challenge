const express = require('express');
const server = express();
const router = express.Router(); 

const data = require("./data/db.js");


server.get( "/api/posts", (req, res) => {
    // console.log(data);
    // console.log(data.find());
    if(!data.find()){
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
    else {
        console.log("getting data!")
        res.send(data.find());
    }
});

server.get( "/api/posts:id", (req, res) => {
    if(!data.findById(req.params.id)){
        res.status(404).json({ error: "The post information could not be retrieved."})
    }
    else {
        res.json(data.find(req.params.id));
    }
});

server.post( "/api/posts", (req, res) => {
    if(!req.body.title | !req.body.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else{ 

        try{
            data.insert(req.body);
            res.status(201).json(req.body);
        }
        catch {
            req.status(400).send({errorMessage: "A bad request was sent!"})
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        }
    }
});

server.delete( "/api/posts:id", (req, res) => {
    if(!data.findById(req.params.id)){
        res.status(404).json({ error: "The post with the specified ID does not exist." })
    }
    else {

        try{
            data.delete(req.params.id);
        }
        catch {
            req.status(400).send({errorMessage: "A bad request was sent!"})
            res.status(500).json({ error: "The post could not be removed" });
        }

    }

});

server.put( "/api/posts:id", (req, res) => {
    if(!data.findById(req.params.id)){
        res.status(404).json({ error: "The post with the specified ID does not exist." })
    }
    else {
       if (!req.body.title | !req.body.contents) {
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
       }
       else {

           try{
                data.update(req.params.id, req.body);
                res.status(200).json(req.body);
           }
           catch{
                res.status(500).json({ error: "The post could not be updated" });
           } 
       }
    }
});

// router.use("/posts", router);

server.use('/', (req, res) => res.send('API up and running!'));
// server.use('/api/posts', router);
// server.use('/api/posts/:id', (req, res) => res.json(req.body));

server.listen(5000, () =>
  console.log('Server running on http://localhost:5000')
);