const jwt = require('jsonwebtoken')
require('dotenv').config()

const APP_SECRET = process.env.SECRET

const getUserId = (context) => {
    const Authorization = context.request.get('Authorization')
    if (Authorization){
        // get the token from authentication header
        const token = Authorization.replace('Bearer ','')
        // reverse the user id from the token
        const { userId } = jwt.verify(token, APP_SECRET)
        return userId
    }

    throw new Error('Not authenticated')
}

module.exports = {
    APP_SECRET,
    getUserId
}