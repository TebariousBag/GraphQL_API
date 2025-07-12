// import/require graphql with all types we are using
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');

// setting up the properties that can be retrieved
const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: {
    id: { type: GraphQLString },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString }
  }
});

// the query section, it is like the menu
const RootQuery = new GraphQLObjectType({
  // first arg
  name: 'RootQuery',
  // second arg fields
  fields: {
    task: {
      type: TaskType,
      resolve(parent, args) {
        // an example of an object
        return {
          id: '14353',
          title: 'my first graphql test',
          weight: 325,
          description: 'practicing to see if we can retrieve'
        };
      }
    }
  }
});

//always export, i still forget this sometimes
// now exporting with our query
module.exports = new GraphQLSchema({
  query: RootQuery
});
