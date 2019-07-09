const express = require('express');          //npm i express@4.14.0 --save
const bodyParser = require('body-parser');   //npm i body-parser@1.15.2 --save
const mongoose = require("./db/mongoose.js");
const { ObjectId } = require('mongodb');

const { Todo } = require('./moduls/todo.js');
const { User } = require('./moduls/users.js');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({ todos })                      //json oldugu ucun obyekt kimi yazdiq yeni {}-icinde
    }, (e) => {
        res.status(400).send(e)
    });
});

app.get('/todos/:id', (req, res) => {
    const id = req.params.id

    if (!ObjectId.isValid(id)) {
        res.status(404).send();
    }

    Todo.findById(id).then((todos) => {
        if (!todos) {
          return res.status(404).send();
        };

        res.send({ todos })
    }).catch((e) => {
        res.status(400).send();
    })

})

app.listen(3000, () => {
    console.log('Started on port 3000')
});

module.exports = { app };