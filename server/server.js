const { ApolloServer } = require("apollo-server");
const { MongoClient } = require("mongodb");
const { typeDefs } = require("./schema");
const resolvers = require("./resolvers");
require("dotenv").config();

const MONGODB_CONNECTION_STRING = process.env.DBHOST;

async function startServer() {
  const client = await MongoClient.connect(MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true
  });
  const db = client.db();
  const context = async ({ req }) => {
    const { headers = {} } = req;
    const githubToken = headers.authorization;
    const currentUser = await db.collection("users").findOne({ githubToken });
    return { db, currentUser };
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context
  });

  server.listen().then(({ url }) => `Service running on ${url}`);
}

startServer();
