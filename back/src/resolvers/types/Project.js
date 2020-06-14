// Non scalar attributes

const ownedBy = (root, args, context) => (
    context.prisma.project({id: root.id}).ownedBy()
)
const tasks = (root, args, context) => (
    context.prisma.project({id: root.id}).tasks()
)

module.exports = {
    ownedBy,
    tasks
}