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

async function resetCustomers() {
  const customers = [
    {
      id: 3,
      name: "AAA",
      email: "maryj@abc.com",
      password: "maryj",
    },
    {
      id: 4,
      name: "BBB",
      email: "karena@abc.com",
      password: "karena",
    },
    {
      id: 5,
      name: "CCC",
      email: "scottr@abc.com",
      password: "scottr",
    },
    {
      id: 6,
      name: "DDD",
      email: "scottr@abc.com",
      password: "scottr",
    },
  ];
  try {
    await collection.deleteMany({});
    await collection.insertMany(customers);
    const custCount = await collection.countDocuments();
    if (custCount) {
      return [custCount, null];
    }
  } catch (err) {
    console.log(err.message);
    return [null, err.message];
  }
}

async function addCustomer(newCustomer) {
  try {
    const result = await collection.insertOne(newCustomer);
    return ["success", result.insertedId, null];
  } catch (err) {
    return ["fail", null, err.message];
  }
}

async function getCustomerById(id) {
  try {
    const customer = await collection.findOne({ id: +id });
    if (!customer) {
      return [null, "No such customer found"];
    }
    return [customer, null];
  } catch (err) {
    return [null, err.message];
  }
}

dbStartup();
module.exports = { getCustomers, resetCustomers, addCustomer, getCustomerById };
