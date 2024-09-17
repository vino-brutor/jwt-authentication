const express = require('express')
const authRouter = require('./routes/auth')
const protectedRouther = require('./routes/protected')

const app = express()

app.use(express.json())

app.use(`/auth`,authRouter)
app.use(`/protected` , protectedRouther)

app.listen(3000, () => console.log(`Servidor rodando na porta 3000`))

//tem q instalar o jsonwebtoken pelo npm pra trabalhar com os tokens json