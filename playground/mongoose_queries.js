const { ObjectId } = require('mongodb')

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/moduls/todo');
const { User } = require('../server/moduls/users');

const id = '5d23a91a5838e03026e7ee61';

// if (!ObjectId.isValid(id)) {
//     console.log('ID not valid')
// };

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos ', todos)
// });

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo ', todo)
// });

// Todo.findById(id).then((todo) => {
//     if (!todo) {
//         return console.log('Unable to find todo')
//     }
//     console.log('Todo by id ', todo)
// }).catch((e) => { console.log(e) });

User.findById('5d248cb57d9b504c0ab70ef9').then((user) => {
    if (!user) {
        return console.log('Unable to find user')
    }

    console.log(JSON.stringify(user, undefined, 2));
}, (e) => {
    console.log(e)
});