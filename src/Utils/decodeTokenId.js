const jwt = require('jsonwebtoken')

module.exports = (params)=>{
      const part = params
      const [bearer, tokenId] = part.split(' ')
      return jwt.decode(tokenId).id
}