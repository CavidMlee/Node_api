const mongoose = require('mongoose');  //npm i mongoose@4.5.9 --save

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/TodoApp")

module.exports={mongoose}