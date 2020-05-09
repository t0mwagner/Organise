const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const resolvers = {
  Query: {
    info: () => `This is the API of todolist`,
    feed: (root, args, context, info) => {
      return context.prisma.links()
    }
  },
  Mutation: {
    postLink: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      })
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql', // Schema
  resolvers, // Resolvers
  context: { prisma }
})
server.start(() => console.log(`Server is running on http://localhost:4000`))