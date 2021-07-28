const User = require('../../models/User')
const bcrypt = require('bcryptjs')
const generateToken = require('../../Utils/generateToken')
const dbConnection = require('../../config/dbConnection')

module.exports = {
  async list(req, res, next){
      dbConnection()
      try {
        const user = await User.find()
        
        if(!await user){
          res.status(400).json({Error : "Não a usuario cadastrado"})
          return
        }
        return res.status(200).json({user})

      } catch (error) {

        return res.status(400).send({Error : "A Roda Não foi encontrada"})

      }
  },
  async listone(req, res, next){
    dbConnection()
      const {id} = req.params
    try {
      const user = await User.findOne({_id:id })
      return res.send({user})

    } catch (error) {
      return res.send({error}).status(400)
    }
  },
  async store(req, res, next){
    dbConnection()
      try {
        const {email} = req.body 

        if(await User.findOne({email: req.body.email})){
          res.json({error: `O Email ${email} Já e Cadastrado em nosso Sistema!`})
          return
        }
         

        const user = await new User(req.body).save()
        
        const token = generateToken({id: user._id})

        res.status(200).json({token, user})

      } catch (error) {
         res.status(400).json(error.message)
      }
  },

  async update(req, res ,next ){
    dbConnection()
    const {id} = req.params

    try {/*
    if(req.body.password){
      res.status(400).send({Error: 'Impossivel Alterar a Senha pelas Rotas'})
      next()
    }*/

      await User.
            findById({_id:id})
            .updateOne(req.body)
            .updateOne({updateAt: new Date()})
            /*
            .select("+password")
            .updateOne({password: await bcrypt.hash(req.body.password, 10)})
            */

      
      res.json({Update: `${req.body.name} Seu cadastro foi alterado com Sucesso`}).status(200) 

    
    

    } catch (error) {
      return res.send({Error:"Usuario Não Encontrado"}).status(400)
    }
  },

  async bonus(req, res ,next ){
    dbConnection()
    const {id} = req.params

    try {/*
    if(req.body.password){
      res.status(400).send({Error: 'Impossivel Alterar a Senha pelas Rotas'})
      next()
    }*/

      await User.update(
        { _id: id },
        { $push: { seal: req.body.seal } }
        ).updateOne({updateAt: new Date()})
      res.json(`Sua Promoção Foi Adicionada`).status(200)
    } catch (error) {
      return res.send({Error:"Usuario Não Encontrado"}).status(400)
    }
  },
  
  async delete(req, res, next){
    dbConnection()
    const {id} = req.params

    try {

      await User.findByIdAndDelete({_id: id})
      return res.send("Usuario Foi deletado com Sucesso").status(200)

    } catch (error) {

      return res.send({Error:"Usuario Não Encontrado"}).status(400)
    }
  }
}