const info = async () => `This is the API of todolist`
const feedTasks = async (root, args, context) => {
  return context.prisma.tasks()
}
const feedProjects = async (root, args, context) => {
  return context.prisma.projects()
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
    task,
    project
}