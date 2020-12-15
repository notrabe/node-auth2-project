const db = require('../../data/connection')

module.exports = {
    add,
    find,
    findBy,
    findById
}

function find() {
    return db('users').select('id', 'username', 'role').orderBy('id')
}

function findBy(filter){
    return db('users').where(filter).orderBy('id')
}

async function add(user){
    try{
        const [id] = await db('users').insert(user, 'id')

        findById(id)
    } catch (err) {
        throw err
    }
}

function findById(id){
    return db('users').where({id}.first())
}