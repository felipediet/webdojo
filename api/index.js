const express = require('express')
const cors = require('cors')
const prisma = require('./prismaClient') // importa o Prisma

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
  console.error(err)

  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON payload' })
  }

  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Ninja do Cypress!' })
})

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body

  if (!name) {
    return res.status(400).json({ error: 'The "Name" field is required!' })
  }
  if (!email) {
    return res.status(400).json({ error: 'The "Email" field is required!' })
  }
  if (!password) {
    return res.status(400).json({ error: 'The "Password" field is required!' })
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // Em produção, use bcrypt para criptografar!
      },
    })

    return res.status(201).json({
      message: 'User successfully registered!',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'Email is already in use!' })
    }
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
})

app.listen(port, () => {
  console.log(`WebDojo is listening on port ${port}`)
})