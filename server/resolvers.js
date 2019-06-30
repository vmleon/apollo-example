const mockData = require("./mockData");
const { authorizeWithGithub } = require("./utils");
const fetch = require("node-fetch");
require("dotenv").config();

let count = 0;
let photos = [...mockData.photos];
let users = [...mockData.users];
let tags = [...mockData.tags];

const resolvers = {
  Query: {
    getCount: () => count,
    getPhotos: (_, __, { db }) =>
      db
        .collection("photos")
        .find()
        .toArray(),
    countPhotos: (_, __, { db }) =>
      db.collection("photos").estimatedDocumentCount(),
    countUsers: (_, __, { db }) =>
      db.collection("users").estimatedDocumentCount(),
    getUsers: (_, __, { db }) =>
      db
        .collection("users")
        .find()
        .toArray(),
    me: (_, __, { currentUser }) => currentUser
  },

  Mutation: {
    incrementCount: () => ++count,
    decrementCount: () => --count,
    postPhoto: async (_, args, { db, currentUser }) => {
      if (!currentUser)
        throw new Error("Only authorized users can post a photo");
      const newPhoto = { ...args.input, userId: currentUser.githubLogin };
      const { insertedIds } = await db.collection("photos").insert(newPhoto);
      return { ...newPhoto, id: insertedIds[0] };
    },
    githubAuth: async (_, { code }, { db }) => {
      const {
        message,
        access_token,
        avatar_url,
        login,
        name
      } = await authorizeWithGithub({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code
      });
      if (message) {
        throw new Error(message);
      }
      let latestUserInfo = {
        name,
        githubLogin: login,
        githubToken: access_token,
        avatar: avatar_url
      };
      const {
        ops: [user]
      } = await db
        .collection("users")
        .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });
      return { user, token: access_token };
    },

    addFakeUser: async (_, { count }, { db }) => {
      const randomUserApi = `https://randomuser.me/api/?results=${count}`;
      let { results } = await fetch(randomUserApi).then(res => res.json());
      const users = results.map(r => ({
        githubLogin: r.login.username,
        name: `${r.name.first} ${r.name.last}`,
        avatar: r.picture.thumbnail
      }));

      await db.collection("users").insert(users);
      return users;
    }
  },

  Photo: {
    id: parent => parent.id || parent._id,
    postedBy: async (parent, _, { db }) =>
      db.collection("users").findOne({ githubLogin: parent.userId }),
    taggedUsers: parent =>
      tags
        .filter(t => t.photoId === parent.id)
        .map(t => t.userId)
        .map(userId => users.find(u => u.githubLogin == userId))
  },

  User: {
    postedPhotos: parent =>
      photos.filter(p => p.githubUser === parent.githubLogin),
    inPhotos: parent =>
      tags
        .filter(t => t.userId === parent.id)
        .map(t => t.photoId)
        .map(photoId => photos.find(p => p.id === photoId))
  }
};

module.exports = resolvers;
