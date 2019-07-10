const { ObjectId } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/moduls/todo');
const { User } = require('../server/moduls/users');

// Todo.findByIdAndRemove({_id:'5d24d2fe22a6f122ec82eb2c'}).then((todo)=>{
//     console.log(todo);
// });

Todo.findOneAndRemove('5d24d2fe22a6f122ec82eb2c').then((todo)=>{
    console.log(todo);
});