const mongoose = require('mongoose');  //npm i mongoose@4.5.9 --save

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI)

module.exports={mongoose}