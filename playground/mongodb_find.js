//npm install mongodb@2.2.5 --save
const { MongoClient,ObjectID } = require('mongodb');   //const MongoClient = require('mongodb').MongoClient - bu demekdi yeni destructingdir

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log("Unable to connect to MongoDb server");
    }
    console.log("Connect to MongoDb server");

    const db = client.db("TodoApp");

    // db.collection("Todos").find({
    //     _id:new ObjectID('5d1ce1ae4c64212b51fe423c')
    // }).toArray().then((docs)=>{
    //     console.log(JSON.stringify(docs,undefined,2))
    // },(err)=>{
    //     console.log("Unable data "+ err)
    // })

    db.collection("Todos").find().count().then((count)=>{    //count-datanin sayini tapir
        console.log(`Todo count: ${count}`)
    },(err)=>{
        console.log("Unable data "+ err)
    })

    //client.close();
});