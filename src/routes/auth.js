const express = require('express')
const users = require('../models/users')
const jwt = require('jsonwebtoken')
const authMiddleware = require('../middlewares/auth-middleware')

const authRouter = express.Router()

const secretKey = 'palavra-chave-super-secreta' // u924fnw9eufba9b5 senha tem q ser a mesma

authRouter.post('/register', (req, res) => { //rota de registro comum
  const { username, password } = req.body

  const user = { username, password }
  users.push(user)

  res.status(201).json(user)
})

authRouter.post('/login', (req, res) => { //rota d elogin
  const { username, password } = req.body // pega os aprametros

  const user = users.find(user => user.username === username) //procura pelo usuario
  if (!user || user.password !== password) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const payload = { username } //tendo achado o suusário, a gente cria nosso payload do tojken

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }) // assim a gente cria o nosos token com o método sign

  res.json({ token })
    
})

module.exports = authRouter
