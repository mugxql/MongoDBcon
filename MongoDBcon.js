const { MongoClient } = require("mongodb");

const uri = "";
const client = new MongoClient(uri);


//create('players', 'personal', {username: 'sebian', money: 10000});
async function create(database, collection, object) {
    try {
        await client.connect();
        const coll = client.db(database).collection(collection);
  
        const result = await coll.insertOne(object);
  
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
  
    } finally {
        await client.close();
    }
}

/*
    findDocument('players', 'personal', {"username": "xxsv"}).then((res) => {
        //do whatever with the results
    })
*/
async function findDocument(database, collection, query) {
  try {
    await client.connect();
    const coll = client.db(database).collection(collection);

    const doc = await coll.findOne(query);
    return doc;

  } finally {
    await client.close();
  }
}

/*
    findField('players', 'personal', 'money', {"username": "xxsv"}).then((res) => {
        //do whatever with the results
    })
*/
async function findField(database, collection, field, query) {
    try {
        await client.connect();
        const coll = client.db(database).collection(collection);

        let distinctValues = await coll.distinct(field, query);
        return distinctValues;

    } finally {
        await client.close();
    }
}

/* 
    update('players', 'personal', {username: 'sebian'}, {$set: {money: 20000}});
    $set to specify which field to update specifically
    {$set: {money: 20000}}
*/
async function update(database, collection, filter, object) {
    try {
        await client.connect();
        const coll = client.db(database).collection(collection);
        
        // this option instructs the method to create a document if no documents match the filter
        const options = { upsert: true };

        const result = await coll.updateOne(filter, object, options);
        
        if (result.matchedCount == 0) {
            console.log("No document(s) matched the filter");
        } else {
            console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
        }

    } finally {
        await client.close();
    }
}

//del('players', 'personal', {username: "sebian"})
async function del(database, collection, query) {
    try {
        await client.connect();
        const coll = client.db(database).collection(collection);

        const result = await coll.deleteOne(query);

        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
        }

    } finally {
        await client.close();
    }
}
