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

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return res.status(200).json(users)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Error fetching users.' })
  }

})

app.put('/api/users/:id', async (req, res) => {
  const {id} = req.params
  const {name, email, password} = req.body

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
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found!' })
    }

    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password
      }
    })

    res.status(204).end()
    
  } catch (error) {
    //console.error(error)
    res.status(500).json({ error: 'Error updating user :(' })
  }
})

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params

  try {

    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    })

    if (!user) {
      return res.status(404).json({ error: 'User not found!' })
    }

    await prisma.user.delete({
      where: { id: Number(id) },
    })

    res.status(204).end()
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error deleting user :(' })
  }
})

app.listen(port, () => {
  console.log(`WebDojo is listening on port ${port}`)
})