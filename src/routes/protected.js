const express = require('express');
const authMiddleware  = require('../middlewares/auth-middleware');

const protectedRouther = express.Router()

protectedRouther.get(`/dashboard`, authMiddleware, (req, res) => {
    const username = req.authenticatedUser.username
    res.json({message: `vc está na area protegida. Bem- vindo(a), ${username}`})
})

module.exports = protectedRouther