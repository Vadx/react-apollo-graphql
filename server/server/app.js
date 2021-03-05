const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3005;

const uri = "mongodb+srv://test-user:Qcv3feXFFhrk5bvB@cluster0.bkwjw.mongodb.net/graphql_db?retryWrites=true&w=majority?authSource=admin";

app.use(cors());

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const dbConnection = mongoose.connection;
dbConnection.on('error', err => console.log(`Connection error: ${err}`));
dbConnection.once('open', () => console.log('Connected to DB!'));

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});
