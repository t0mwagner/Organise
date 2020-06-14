const tasks = (root, args, context) => (
    context.prisma.user({id: root.id}).tasks()
)

const projects = (root, args, context) => (
    context.prisma.user({id: root.id}).projects()
)

module.exports = {
    tasks,
    projects
}