// import/require graphql with all types we are using
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID } = require('graphql');
// import require lodash
const _ = require('lodash');

// an array of task objects
const tasks = [
  // task object 1
  {
    id: '1',
    title: 'Create your first webpage',
    weight: 1,
    description: 'Create your first HTML file 0-index.html with: -Add the doctype on the first line (without any comment) -After the doctype, open and close a html tag Open your file in your browser (the page should be blank)}'
  },
  // task object 2
  {
    id: '2',
    title: 'Structure your webpage',
    weight: 1,
    description: 'Copy the content of 0-index.html into 1-index.html Create the head and body sections inside the html tag, create the head and body tags (empty) in this order'
  }
];

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
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return _.find(tasks, { id: args.id });
      }
    }
  },
});


//always export, i still forget this sometimes
// now exporting with our query
module.exports = new GraphQLSchema({
  query: RootQuery
});
