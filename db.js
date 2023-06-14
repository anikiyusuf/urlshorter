require('dotenv').config()
const mongoose = require('mongoose')
const logger = require("./logger/logger")
const MONGODB = process.env.MONGODB

function  connectionMongoDB(){
    mongoose.connect(MONGODB ,{
        serverSelectionTimeoutMS: 30000})

    mongoose.connection.on('connected', () =>{
        logger.info('connection to mongodb successful')
    })

    mongoose.connection.on('err', (err) =>{
        logger.error(err)
        
    })

}


module.exports =   {connectionMongoDB}