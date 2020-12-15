const express = require('express') 
const helmet = require('helmet')
const cors = require('cors')

const authRouter = require('')
const usersRouter = require('')

const server = express()

server.use(helmet())
server.use(cors())
server.use(express.json())

server.use('/api/auth', authRouter)
server.use('/api/users', usersRouter)
