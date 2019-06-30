# GraphQL server

This is a Node.js GraphQL server with MongoDB integration and Github Identity manager integration.

## Start MongoDB

```
./db.sh
```

## Start server

First time, install dependencies

```
npm i
```

By default, a DBHOST environment variable is on .env file. If not you can set up manually with:

```
export DBHOST=mongodb://localhost:27017/<NAME>
```

Then, run the server with:

```
npm start
```

## Github OAuth

Request a code with:

```
https://github.com/login/oauth/authorize?client_id=<CLIENT_ID>&scope=user
```

Use that to send a mutation to login, to get the token:

```
mutation Login {
  githubAuth(code: "<code>") {
    user {
      githubLogin
      name
      avatar
    }
    token
  }
}
```
