// require our schema.js
const schema = require('./schema/schema.js');
const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const mongoose = require('mongoose');

const app = express();
// was empty, need to tell it to use the interface when accessing in browser
app.use('/graphql',graphqlHTTP({
  schema: schema,
  graphiql: true
}));

// connecting to mongodb
mongoose.connect(
  'mongodb+srv://tristiangdavis:<XGFEW_fU9RLr$L$>@cluster0.pun285y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
// log to make sure we are connected
mongoose.connection.once('open', () => {
  console.log('connected to database');
});


app.listen(5500,()=>{
  console.log('now listening for request on port 5500');
});
