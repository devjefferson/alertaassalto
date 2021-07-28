const express = require('express')
const router = express.Router()
const User = require('../controllers/User')
const Auth = require('../controllers/Auth')
const Occorrence = require('../controllers/Occorrence')
const Middleware = require('../Middleware/Auth')

// Rota Publicas ou postagens
router.post('/login', Auth.login)
router.post('/user', User.store)
router.get('/occorrence/:count', Occorrence.list)
router.get('/occorrence-map/:params', Occorrence.listMapPin)
router.get('/occorrence/search/:count', Occorrence.search)
//
router.use(Middleware)

//Rota Para Manipulação de Usuarios
router.delete('/occorrence/delete/:id', Occorrence.delete)
router.get('/occorrence/user/:id', Occorrence.listUser)
router.get('/user',User.list)
router.get('/user/:id', User.listone)
router.put('/user/:id', User.update)
router.delete('/user/:id', User.delete)

//Manupular Rota de Occorrence
router.post('/occorrence', Occorrence.store)


module.exports = router