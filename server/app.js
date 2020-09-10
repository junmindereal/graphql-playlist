const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();
const options = {useNewUrlParser: true, useUnifiedTopology: true};

// allow cross-origin requests
app.use(cors());

mongoose
    .connect(
        process.env.MONGO_URI,
        options
    )
    .then(() => console.log("Connected to MongoDB Atlas"))
    .catch((err) => console.log("Error: ", err.message));

app.use("/graphql", graphqlHTTP({schema, graphiql: true}));

app.listen(4000, () => {
    console.log("now listening for requests on port 4000");
});
