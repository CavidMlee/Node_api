const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');

const { Todo } = require('../../moduls/todo');
const { User } = require('../../moduls/users');

const userOneId = new ObjectId();
const userTwoId = new ObjectId();

const users = [{                          //user ucun olan datalar   
    _id: userOneId,
    email: 'cavidmelikli19@gmail.com',
    password: 'cavid1995',
    tokens: [{
        access: 'auth',
        token: jwt.sign({ _id: userOneId, access: 'auth' }, 'abc123').toString()
    }]

},
{
    _id: userTwoId,
    email: 'cavidmelikli1995@gmail.com',
    password: 'cavid123'
}]


const todos = [{                                       //bazaya vurulacaq datadi
    _id: new ObjectId(),
    text: 'First todo text'
},
{
    _id: new ObjectId(),
    text: 'Second todo text',
    completed: true,
    completedAt: 333
}];

const populateTodos = (done) => {                                //Her ise dusmemisden evvel databazani sifirlayir
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done())
}

const populateUsers = (done) => {
    User.remove({}).then(() => {
        const userOne = new User(users[0]).save();
        const userTwo = new User(users[1]).save();

        return Promise.all([userOne, userTwo])
    }).then(() => done())
}

module.exports = { todos, populateTodos, users, populateUsers };