const { SHA256 } = require('crypto-js');   //npm i crypto-js@3.1.6 --save
const jwt = require('jsonwebtoken');     //npm install jsonwebtoken@7.1.9 --save

const data = {
    id: 10
};

const token = jwt.sign(data, '123abc');
console.log('token ', token);

const decode = jwt.verify(token, '123abc');
console.log('decode ', decode);
