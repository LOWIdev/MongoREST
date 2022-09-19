# MongoDB and Express.js REST API application

## How To Run

1. You can follow the [Getting Started with Atlas](https://docs.atlas.mongodb.com/getting-started/) guide, to learn how to create a free Atlas account, create your first cluster and get your Connection String to the database. 
Then, set the Atlas URI connection parameter in `/config.env` to your Connection String:
```
ATLAS_URI=mongodb+srv://<username>:<password>@sandbox.jadwj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
```

2. Start the Express server:
```
cd server
npm install
npm install -g nodemon
npm run dev

3. Try it with Postman:

POST http://localhost:3500/guidedtours
Body (form-data):
_id: String :required,
title: String :required,
description: String

and after: 

GET http://localhost:3500/guidedtours


--------------
Paths:

/guidedtours GET
/guidedtours POST
/guidedtours:id PUT
/guidedtours:id DELETE

