const { APP_SECRET, getUserId } = require('../utils')

const info = async () => `This is the API of todolist`
const feedTasks = async (root, args, context) => {
  const userId = getUserId(context)
  return context.prisma.tasks({where:{ownedBy:{id:userId}}})
}
const feedProjects = async (root, args, context) => {
  const userId = getUserId(context)
  return context.prisma.projects({where:{ownedBy:{id:userId}}})
}
const feedTasksByProject = async (root, args, context) => {
  const userId = getUserId(context)
  return context.prisma.tasks({where :{project: args.project, ownedBy:{id:userId}}})
}
const task = async (root, args, context) => {
  return context.prisma.task({id: args.id})
}
const project = async (root, args, context) => {
  return context.prisma.project({id: args.id})
}

module.exports = {
    info,
    feedTasks,
    feedProjects,
    feedTasksByProject,
    task,
    project
}