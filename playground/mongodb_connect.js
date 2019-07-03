//npm install mongodb@2.2.5 --save
const { MongoClient } = require('mongodb');   //const MongoClient = require('mongodb').MongoClient - bu demekdi yeni destructingdir

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log("Unable to connect to MongoDb server");
    }
    console.log("Connect to MongoDb server");

    const db = client.db("TodoApp");

    // db.collection('Todos').insertOne({
    //     text: 'Something to do',
    //     completed: false
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert todo', err)
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2))             // .ops - daxil etdiyimiz butun datani icinde saxlayir ve result.ops vasitesiyle biz bunlara baxa bilerik
    // })

    db.collection("Users").insertOne({
        name: "Cavid",
        age: 23,
        location: 'Baku'
    }, (err, result) => {
        if (err) {
            return console.log('Unable to insert')
        }
        console.log(JSON.stringify(result.ops))               // .ops - daxil etdiyimiz butun datani icinde saxlayir ve result.ops vasitesiyle biz bunlara baxa bilerik
    })
    client.close();
});