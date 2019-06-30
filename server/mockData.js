module.exports = {
  photos: [
    {
      id: 1,
      name: "Dropping the Heart Chute",
      description: "The heart chute is one of my favorite chutes",
      category: "ACTION",
      githubUser: "gPlake"
    },
    {
      id: 2,
      name: "Enjoying the sunshine",
      category: "SELFIE",
      githubUser: "sSchmidt"
    },
    {
      id: 3,
      name: "Gunbarrel 25",
      description: "25 laps on gunbarrel today",
      category: "LANDSCAPE",
      githubUser: "mHattrup"
    },
    {
      id: 4,
      name: "A cat",
      description: "Just a picture of a cute cat",
      category: "PORTRAIT",
      githubUser: "gPlake"
    }
  ],
  users: [
    { githubLogin: "mHattrup", name: "Mike Hattrup" },
    { githubLogin: "gPlake", name: "Glen Plake" },
    { githubLogin: "sSchmidt", name: "Scot Schmidt" }
  ],
  tags: [
    { photoId: 1, userId: "gPlake" },
    { photoId: 2, userId: "sSchmidt" },
    { photoId: 2, userId: "mHattrup" },
    { photoId: 2, userId: "gPlake" }
  ]
};
