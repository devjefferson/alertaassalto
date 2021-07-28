const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = (req, res, next)=>{
  authHeader = req.headers.authorization;

  if(!authHeader)
    return res.status(400).json({error: 'Token Não informado'})
    

  const parts = authHeader.split(' ')
  

  if(!parts.length === 2)
    return res.status(401).json({error: 'erro no Token'})

  const [schema, token] = parts

  if(!/^Bearer$/i.test(schema))
    return res.status(401).json({error: 'Token malformatado'})

  jwt.verify(token, process.env.SECRET_MD5, (error, decoded)=>{
    if(error)
      return res.status(401).json({error: 'Token Invalido'})

    req.userId = decoded.id;
    return next()
  })

}