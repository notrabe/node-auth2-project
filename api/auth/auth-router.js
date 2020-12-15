const bcrypt = require('bcryptjs')

const jwt = require('jsonwebtoken')
const router = require('express').Router()

const {jwtSecret} = require('./secret')

const Users = require('../users/users-model')
const {isValid} = require('../users/users-service')

router.post('/register', (req, res) => {
    const credentials = req.body;

    if(isValid(credentials)){
        const rounds = process.env.BCRYPT_ROUNDS || 8

        const hash = bcryptjs.hashSync(credentials.password, rounds)
        
        credentials.password = hash

        Users.add(credentials)
            .then((user) => {
                res.status(201).json({data: user})
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    } else {
        res.status(400).json({message: 'Invalid credentials.'})
    }
})

router.post('/login', (req, res) => {
    const{ username, password }  = req.body

    if(isValid(req.body)) {
        Users.findBy({ username: username})
            .then(([user]) => {
                if(user && bcryptjs.compareSync(password, user.password)) {
                    const token = makeToken(user)
                    res.status(200).json({message: 'welcome to our API' + token})
                } else { 
                    res.status(401).json({message: 'Invalid credentials.'})
                }
            })
            .catch(err => {
                res.status(500).json({message: err.message})
            })
    } else {
        res.status(400).json({message: 'please provide and alphanumeric name and password'})
    }
})

function makeToken(user) { 
    const payload = {
        subject: user.id,
        username: user.username, 
        role: user.role,
        foo: 'bar'
    }
    const options = { 
        expiresIn: '500s',
    }
    return jwn.sign(payload, jwtSecret, options)
}



module.exports = router