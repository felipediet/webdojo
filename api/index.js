const express = require('express')
const cors = require('cors')

const app = express()
const port = 3333

app.use(cors()) // Middleware para habilitar CORS
app.use(express.json()) // Middleware para analisar JSON no corpo das requisições

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Ninja do Cypress!' })
})

app.post('/api/users/register', (req, res) => {

  const { name, email, password } = req.body

  if (!name) {
    return res.status(400).json({ error: 'Name é obrigatório!' })
  }

  if (!email) {
    return res.status(400).json({ error: 'Email é obrigatório!' })
  }

  if (!password) {
    return res.status(400).json({ error: 'Password é obrigatório!' })
  }

  console.log(req.body)
  return res.status(201).json({message: 'Usuário cadastrado com sucesso!'})
})

app.listen(port, () => {
  console.log(`WebDojo is listening on port ${port}`)
})