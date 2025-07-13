// require our schema.js
const schema = require('./schema/schema.js');

const express = require('express');
const {graphqlHTTP} = require('express-graphql');

const app = express();
// was empty, need to tell it to use the interface when accessing in browser
app.use('/graphql',graphqlHTTP({
  schema: schema,
  graphiql: true
}));
app.listen(5500,()=>{
  console.log('now listening for request on port 4000');
});
