// import/require graphql with all types we are using
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID, GraphQLList, GraphQLNonNull } = require('graphql');
// import require lodash
const _ = require('lodash');
// need to import models
const Project = require('../models/project');
const Task = require('../models/task');

// deleted the two arrays of data

// setting up the properties that can be retrieved for Task
const TaskType = new GraphQLObjectType({
  name: 'Task',
  // have to wrap it in a function
  // otherwise it is not defined yet
  fields: () => ({
    // changing to id
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    // adding project here
    project: {
      type: ProjectType,
      resolve(parent, args) {
        // find by id
        return Project.findById(parent.projectId);
      }
    }
  })
});

// setting up the properties that can be retrieved for Properties
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    // changing to id
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    weight: { type: GraphQLInt },
    description: { type: GraphQLString },
    // adding tasks here
    tasks: {
      type: GraphQLList(TaskType),
      resolve(parent, args) {
        // find by id
        return Task.findById(parent.projectId);
      }
    }
  })
});

// the query section, it is like the menu
const RootQuery = new GraphQLObjectType({
  // first arg
  name: 'RootQuery',
  // second arg fields
  fields: {

    // task field
    task: {
      type: TaskType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // find by id
        return Task.findById(args.id);
      }
    },

  // project field
    project: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        // find by id
        return Project.findById(args.id);
      }
    },
  
    // all tasks field
    tasks: {
      type: GraphQLList(TaskType),
      resolve(parent, args) {
        // find task
        return Task.find({});
      }
    },

    // all projects field
    projects: {
      type: GraphQLList(ProjectType),
      resolve(parent, args) {
        // find project
        return Project.find({});
      }
    }
}
});

// new mutation
const Mutation = new GraphQLObjectType ({
  //first arg
  name: 'Mutation',
  // second arg
  fields: {
    // our add project
    addProject: {
      type: ProjectType,
      args: {
        // add new nonnull
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const newProject = new Project ({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
        // make sure to save
        return newProject.save();
      },
    },

    // our add task
    addTask: {
      type: TaskType,
      args: {
        // add new nonnull
        title: { type: new GraphQLNonNull(GraphQLString) },
        weight: { type: new GraphQLNonNull(GraphQLInt) },
        description: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const newTask = new Project ({
          title: args.title,
          weight: args.weight,
          description: args.description,
        });
        // make sure to save
        return newTask.save();
      }
    }
  }
})

//always export, i still forget this sometimes
// now exporting with our query
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
