const postTask = async(root, args, context) => {
    return context.prisma.createTask({
        name: args.name,
        description: args.description,
        categoryId: args.categoryId,
        done: args.done,
        doneDate: args.doneDate,
        dueDate: args.dueDate 
        
    })
}
const updateTask = async(root, args, context) => {
    return context.prisma.updateTask({
        data : {
            name: args.name,
            description: args.description,
            categoryId: args.categoryId,
            done: args.done,
            doneDate: args.doneDate,
            dueDate: args.dueDate
        },
        where : {
            id: args.id
        }
    })
}
const deleteTask = async(root, args, context) => {
    return context.prisma.deleteTask(
        {
            id: args.id
        }
    )
}

const postProject = async(root, args, context) => {
    return context.prisma.createProject({
        name: args.name,
        description: args.description,
        color: args.color
    })
}
const updateProject = async(root, args, context) => {
    return context.prisma.updateProject({
        data : {
            name: args.name,
            description: args.description,
            color: args.color
        },
        where : {
            id: args.id
        }
    })
}
const deleteProject = async(root, args, context) => {
    return context.prisma.deleteProject(
        {
            id: args.id
        }
    )
}

module.exports = {
    postTask,
    updateTask,
    deleteTask,
    postProject,
    updateProject,
    deleteProject
}