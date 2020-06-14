const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

const postTask = async(root, args, context) => {
    const userId = getUserId(context)
    return context.prisma.createTask({
        name: args.name,
        description: args.description, 
        done: args.done,
        doneDate: args.doneDate,
        dueDate: args.dueDate,
        project: {connect:{id:args.project.id}},
        ownedBy:{connect:{id:userId}}
    })
}
const updateTask = async(root, args, context) => {
    return context.prisma.updateTask({
        data : {
            name: args.name,
            description: args.description,
            project: args.project,
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
    const userId = getUserId(context)
    return context.prisma.createProject({
        name: args.name,
        description: args.description,
        color: args.color,
        ownedBy:{connect:{id:userId}}
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

const signup = async(root, args, context , info) => {
    // hash the password to store it
    const hashedPassword = await bcrypt.hash(args.password, 10)
    // create the user (with hashed password) and retrieve it
    const {password, ...user} = await context.prisma.createUser({...args, password: hashedPassword})
    // create a token based on user id and app secret
    const token = jwt.sign({userId: user.id}, APP_SECRET)
    // return the token and the user
    return{
        token,
        user
    }
}

const login = async(root, args, context, info) => {
    // get one user from it's email
    const {password, ...user} = await context.prisma.user({email:args.email})
    if (!user){
        throw new Error('No user found')
    }
    // if the email is know, compare the bcrypts
    const valid = await bcrypt.compare(args.password, password)
    if (!valid){
        throw new Error('Invalid password')
    }
    // if email known and pass ok, create the token
    const token = jwt.sign({userId: user.id}, APP_SECRET)
    return {
        token,
        user
    }
}

module.exports = {
    postTask,
    updateTask,
    deleteTask,
    postProject,
    updateProject,
    deleteProject,
    signup,
    login
}