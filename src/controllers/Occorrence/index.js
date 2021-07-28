const dbConnection = require('../../config/dbConnection')
const Occorrence = require('../../models/Occorrence')
const { subDays } = require('date-fns')

module.exports = {

  async list(req, res, next) {
    
    var perPage = 5
    var page = Math.max(0, req.params.count)
    var search = {}

    if(req.query.search){
      search = { district:req.query.search}
      
    }    
    try {
      dbConnection()
      const Occorrences = await Occorrence.find(
       search
      ).collation( { locale: "en_US", strength: 1 } ).sort({createdAt: 'desc'})
      .limit(perPage)
      .skip((page - 1) * perPage)
      .exec();
      
      const count  = await Occorrence.countDocuments()

      res.status(200).json({
        data: Occorrences,
        totalPages: Math.ceil(count / perPage),
        currentPage: page
      })


    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },
  async listMapPin(req, res, next) {
    dbConnection()
    const { params } = await req.params
    try {

      const Occorrences = await Occorrence.find({createdAt:{ $gt: subDays(new Date(), params)}}).sort({createdAt:-1})

      console.log(Occorrences.length)
      res.status(200).json(Occorrences)

    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async search(req, res, next) {
    
    var perPage = 5
    var page = Math.max(0, req.params.count)
    console.log(req.query)

    try {
      dbConnection()
      const Occorrences = await Occorrence.find({district:req.query.search}).sort({createdAt: 'desc'})
      .limit(perPage)
      .skip((page - 1) * perPage)
      .exec();
      
      const count  = await Occorrence.countDocuments()

      res.status(200).json({
        data: Occorrences,
        totalPages: Math.ceil(count / perPage),
        currentPage: page
      })


    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },
  
  async listUser(req, res, next) {
    const { id } = req.params
    var perPage = 5
    var page = Math.max(0, req.query.count)

    try {
      dbConnection()
      const Occorrences = await Occorrence.find({userCreate:id}).sort({createdAt: 'desc'})
      .limit(perPage)
      .skip((page - 1) * perPage)
      .exec();
      
      const count  = await Occorrence.countDocuments()

      res.status(200).json({
        data: Occorrences,
        totalPages: Math.ceil(count / perPage),
        currentPage: page
      })


    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async store(req, res, next) {

    dbConnection()
    try {
      const { authorization } = req.headers
      
      if (!authorization) {
        res.status(401).json({ error: "Token Não Informado" })
      }
      const occorrece = await new Occorrence({
        ...req.body
      }).save()

      console.log(occorrece.data)
      res.json({ occorrece })

    } catch (error) {
      res.status(401).json({ error: error.message })
    }
  },

  async delete(req, res, next) {

    const { id } = req.params
    const { authorization } = req.headers
      
    if (!authorization) {
      res.status(401).json({ error: "Token Não Informado" })
    }
    console.log(id)

    try {
      await Occorrence.deleteOne({_id:id})
      res.status(200).json({message: "Ocorrencia Deletada com Sucesso."})

    } catch (error) {
      res.status(401).json({ error: error.message })
    }
  }
}