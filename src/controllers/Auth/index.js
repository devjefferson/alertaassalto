const bcrypt = require('bcryptjs');
const dbConnection = require('../../config/dbConnection');
const User = require('../../models/User')
const generateToken = require('../../Utils/generateToken')


module.exports = {
  async login(req, res, next){
    var {email, password} = req.body
    dbConnection()
    try {
      const user = await User.findOne({email}).select('+password')
      if(!await user)
        res.status(401).json({error: "Email ou a Senha esta incorreto!"})
      

      bcrypt.compare(password, user.password, async (error, result)=>{
        if(error){
          return res.status(400).json({error, error})
        }
      
        if(result){
          const token = generateToken({id: user._id})
          await User.findById(user._id).updateOne({lastacessAt: new Date()})
          res.status(200).json({token, user})
           
        } else {
          return res.status(400).json({error: "Email ou a Senha esta incorreto!"})
        }

      })

    } catch (error) {
      res.status(400).json({error: "Impossivel acessar essa rota!"})
    }
  }
}