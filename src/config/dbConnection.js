const mongoose = require('mongoose')
require('dotenv').config()

const mongo = ()=>{
  return  mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_DATABASE}?authSource=admin&replicaSet=${process.env.DB_REPLICASET}&tls=true`, {sslValidate: false, ssl: true,useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true})
}

const connect = ()=>{
  console.log('DB Connectaded')
  return mongo()
}


module.exports = connect