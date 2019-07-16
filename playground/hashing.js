const { SHA256 } = require('crypto-js');   //npm i crypto-js@3.1.6 --save
const jwt = require('jsonwebtoken');     //npm install jsonwebtoken@7.1.9 --save
const bcrypt = require('bcryptjs');      //npm i bcryptjs@2.3.0 --save

const password = '123abc';

bcrypt.genSalt(10,(err,salt)=>{
    bcrypt.hash(password,salt,(err,hash)=>{
        console.log(hash);
    })
})

const hashedPassword = "$2a$10$bCxG1bwALcvZm4WYz7UycOKcaNfv40mnX8o.caLWLBRY8P61l3y72";

bcrypt.compare(password,hashedPassword,(err,res)=>{
    console.log(res);
});

// const data = {
//     id: 10
// };

// const token = jwt.sign(data, '123abc');
// console.log('token ', token);

// const decode = jwt.verify(token, '123abc');
// console.log('decode ', decode);
