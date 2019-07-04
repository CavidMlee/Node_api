//npm install mongodb@2.2.5 --save
const { MongoClient, ObjectID } = require('mongodb');   //const MongoClient = require('mongodb').MongoClient - bu demekdi yeni destructingdir

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log("Unable to connect to MongoDb server");
    }
    console.log("Connect to MongoDb server");

    const db = client.db("TodoApp");

    //deleteMany
    // db.collection("Todos").deleteMany({text:'Eat lunc'}).then((result)=>{
    //     console.log(result)
    // })

    //deleteOne
    db.collection("Todos").deleteOne({ text: 'Eat lunc' }).then((result) => {
        console.log(result)
    })

    //findOneAndDelete
    db.collection("Todo").findOneAndDelete({completed:true}).then((result)=>{
        console.log(result)
    })

    //client.close();
});