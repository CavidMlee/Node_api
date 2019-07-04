//npm install mongodb@2.2.5 --save
const { MongoClient, ObjectID } = require('mongodb');   //const MongoClient = require('mongodb').MongoClient - bu demekdi yeni destructingdir

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log("Unable to connect to MongoDb server");
    }
    console.log("Connect to MongoDb server");

    const db = client.db("TodoApp");

    // db.collection('Todos').findOneAndUpdate({
    //     _id: new ObjectID("5d1bc465d4410f2634331ffe")
    // }, {
    //         $set: {
    //             completed: true
    //         }
    //     }, {
    //         returnOriginal: false
    //     }).then((result) => {
    //         console.log(result)
    //     })

    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID("5d1cd2f8b78bfc2e48432253")
    }, {
            $set: {
                name: 'Seyidaga'
            },
            $inc:{
                age:1
            }
        }, {
            returnOriginal: false
        }).then((result) => {
            console.log(result)
        })


    //client.close();
});