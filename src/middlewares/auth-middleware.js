const jwt = require('jsonwebtoken')
const users = require('../models/users')

const secretKey = 'palavra-chave-super-secreta'

//e assim a gente cria um middleware pra fazer todas as verificações necessária na hora de frazer o login pra entrar nas páginas q são excluivas pra qm logou

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization //o token com o cabeçalho

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header required' })
  } //ve se o header existe

  const token = authHeader.split(' ')[1] //tira o excesso

  try {
    const decodedToken = jwt.verify(token, secretKey) //verifica o token, com aquela chave secreta definida

    const user = users.find(user => user.username === decodedToken.username) //ve se tem um user com o mesmo nome 
    if (!user) {
      return res.status(401).json({ message: 'Invalid user' })
    }

    req.authenticatedUser = user

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

module.exports = authMiddleware