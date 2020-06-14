const ownedBy = (root, args, context) => (
    context.prisma.task({id: root.id}).ownedBy()
)

const project = (root, args, context) => (
    context.prisma.task({id: root.id}).project()
)

module.exports = {
    ownedBy,
    project
}