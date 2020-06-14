const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/types/User')
const Task = require('./resolvers/types/Task')
const Project = require('./resolvers/types/Project')

const resolvers = {
  Query,
  Mutation,
  User,
  Task,
  Project
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => {
    return {
      ...request, // queries or mutations are attached to the context so they can be read for authentication purposes
      prisma
    }
  }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))