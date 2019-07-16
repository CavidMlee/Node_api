require('./config/config.js')    // bizim elaqe js-miz

const _ = require('lodash');                  //npm i --save lodash@4.15.0
const express = require('express');          //npm i express@4.14.0 --save
const bodyParser = require('body-parser');   //npm i body-parser@1.15.2 --save
const mongoose = require("./db/mongoose.js");
const { ObjectId } = require('mongodb');

const { Todo } = require('./moduls/todo.js');
const { User } = require('./moduls/users.js');
const { authenticate } = require('./middleware/authenticate');

const port = process.env.PORT // Heroku ve localhost ucundur

const app = express();

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {                    //post ishi
    const todo = new Todo({
        text: req.body.text,                          //postman-dan verdiyimiz text-i goturur
        _creator: req.user._id
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', authenticate, (req, res) => {                 //get ishi hamsini listeleyir ve hemcinin autentifikasiya teleb edir
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({ todos })                      //json oldugu ucun obyekt kimi yazdiq yeni {}-icinde
    }, (e) => {
        res.status(400).send(e)
    });
});

app.get('/todos/:id', authenticate, (req, res) => {                     //get isi id-ye gore
    const id = req.params.id

    if (!ObjectId.isValid(id)) {                          //bele id yoxdusa
        res.status(404).send();
    }

    Todo.findOne({
        _id: id,
        _creator: req.user._id
    }).then((todos) => {
        if (!todos) {
            return res.status(404).send();
        };

        res.send({ todos })
    }).catch((e) => {
        res.status(400).send();
    })

});

app.delete('/todos/:id', authenticate, (req, res) => {                   //id-ye gore silmek
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send()
    }

    Todo.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo })
    }).catch((e) => {
        res.status(400).send();
    });
});

app.patch('/todos/:id', authenticate, (req, res) => {                     //update isidir.CompletedAt-i update edirik competed-e gore
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);     //lodash-in pick funksiyasidi.pick - icind eobyekt saxlayir

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {    //lodash-in isBollean funksiyasi true ve ya false qaytarir
        body.completedAt = new Date().getTime();              //true olsa completedAt-e zaman yaz
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findOneAndUpdate({ _id: id, _creator: req.user.id }, { $set: body }, { new: true }).then((todo) => {   //update isi
        if (!todo) {
            return res.status(404).send();
        }

        res.send({ todo });
    }).catch((e) => {
        res.status(400).send();
    })
});

//POST User
app.post('/users', (req, res) => {                      //post ishi

    const body = _.pick(req.body, ['email', 'password'])   // lodash-in pick funksiasi icinde obyekt saxlayir
    const user = new User(body);

    user.save().then(() => {
        return user.generateAuthToken()   //  bu funksiyani user.js-de yaratdiq bu hem token yaradir hemde useri save edir
    }).then((token) => {
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send(e);
    });
});


//Post/user/login (email,password)
app.post('/users/login', (req, res) => {
    const body = _.pick(req.body, ['email', 'password'])   // lodash-in pick funksiasi icinde obyekt saxlayir

    User.findByCredentials(body.email, body.password).then((user) => {          //bu funksiyani user.js-de yaratmisiq
        return user.generateAuthToken().then((token) => {                      //tokenide vere blmek ucun
            res.header('x-auth', token).send(user);
        })
    }).catch((e) => {
        res.status(400).send();
    });
})

app.get('/users/me', authenticate, (req, res) => {          //user-in get isi
    res.send(req.user);
});

app.delete('/users/me/token', authenticate, (req, res) => {         //logout
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
});

app.listen(port, () => {                                  //port
    console.log(`Started on port ${port}`)
});

module.exports = { app };