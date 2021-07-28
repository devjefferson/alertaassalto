const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (params = {})=>{
  return jwt.sign(params, process.env.SECRET_MD5, { 
    expiresIn: 86400
  })
}