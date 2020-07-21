const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();
const options = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
  .connect(
    "mongodb+srv://admin:12345@training.viq6y.mongodb.net/Training?retryWrites=true&w=majority",
    options
  )
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.log("Error: ", err.message));

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
