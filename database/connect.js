require('dotenv').config();
const {MongoClient,ServerApiVersion} = require('mongodb');
const database_string = process.env.DB_CONNECTION_STRING;

let database;

const connectDatabase = async () => {
  if (database) return database;
  try {
    const client = new MongoClient(database_string, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    await client.connect();
    console.log(`Connected successfully to ${process.env.DB_NAME}`);
    database = client.db(process.env.DB_NAME);
    await database.command({ ping: 1 });
    console.log("Connected successfully to server");
    return database;
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
};

module.exports = connectDatabase;
