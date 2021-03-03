const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('../schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 3005;

const uri = "mongodb+srv://test-user:Qcv3feXFFhrk5bvB@cluster0.bkwjw.mongodb.net/graphql_db?retryWrites=true&w=majority";

// mongoose.connect('mongodb+srv://test-user:Qcv3feXFFhrk5bvB@cluster0.bkwjw.mongodb.net/graphql_db?retryWrites=true&w=majority');
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })

// test-user
// Qcv3feXFFhrk5bvB
//mongodb+srv://vadx:<password>@cluster0.bkwjw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

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
