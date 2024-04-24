// mongodb client driver
const { MongoClient } = require("mongodb");

// DB Connection URL
var url = "mongodb://127.0.0.1:27017";

// Database and collection variables
const dbName = "custdb";
const collectionName = "customers";
const connectString = url + "/" + dbName;
let collection;

async function dbStartup() {
  // Create client
  const client = new MongoClient(connectString);
  await client.connect();
  // set the database to use
  const db = client.db(dbName);
  // set the collection to use
  collection = db.collection(collectionName);
}

//get all customers
async function getCustomers() {
  try {
    const customers = await collection.find({}).toArray();
    //throw { message: "an error occured" };
    return [customers, null];
  } catch (err) {
    console.log(err.message);
    return [null, err.message];
  }
}

dbStartup();
module.exports = { getCustomers };
