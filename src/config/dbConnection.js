const mongoose = require('mongoose')
require('dotenv').config()

const mongo = ()=>{
  return  mongoose.connect("mongodb+srv://alertaassaltoDB:g6VnL150SNQ7248j@db-mongodb-nyc3-03622-6120d5d2.mongo.ondigitalocean.com/AlertaAssaltoDB?authSource=admin&replicaSet=db-mongodb-nyc3-03622&tls=true", {sslValidate: false, ssl: true,useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
}

const connect = ()=>{
  console.log('DB Connectaded')
  return mongo()
}


module.exports = connect