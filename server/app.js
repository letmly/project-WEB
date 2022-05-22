const express = require('express')
const { Sequelize, DataTypes, Model } = require('sequelize');
const app = express()
const validator = require('validator').default;
const cors = require('cors')
const { verifyToken, createToken, comparePassword, createPasswordHash } = require('./auth-service')

const sequelize = new Sequelize('beingkind', 'cruelwrld', '12345', {
    host: 'localhost',
    dialect: 'mysql'
});


class FUN extends Model { }
class Admin extends Model { }

function stringType() {
    return {
        type: DataTypes.STRING,
        allowNull: false
    }
}
FUN.init({
    nick: stringType(),
    idbunkera: stringType(),
    way: stringType(),
    info: {
        type: DataTypes.TEXT,
        allowNull: false
    },
}, {
    modelName: 'FUN',
    sequelize
})

Admin.init({
    name: stringType(),
    password: stringType(),

}, {
    modelName: 'Admin',
    sequelize
})

start()

async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('VSE NONRM');
        startApp()
    } catch (error) {
        console.error(error)
    }
}

function startApp() {
    app.use(cors())
    app.use(express.json())

    app.get('/', function (req, res) {
        res.send('nihao')
    })

    app.post('/api/admin', async function (req, res) {
        const PasswordHash = createPasswordHash(req.body.password)
        const newAdmin = await Admin.create({
            name: req.body.name,
            password: PasswordHash
        })
        res.send(newAdmin)
    })

    app.post('/api/login', async function (req, res) {
        const userFromDB = await Admin.findOne({ where: { name: req.body.name } })
        if (comparePassword(req.body.password, userFromDB.password)) {
            const token = createToken(userFromDB)
            res.send({
                token
            })
        } else {
            res.status(403).send({
                message: 'Старина,...'
            })
        }
    })


    app.get('/api/sadway', verifyToken, async function (req, res) {
        const orders = await FUN.findAll()
        res.send(orders)
    })

    app.post('/api/sadway', async function (req, res) {
        const funnyInfo = req.body
        let validationError = []
        // if (!validator.isMobilePhone(sadInfo.idbunkera.replace(/\D/g, ''), ['ru-RU']))
        //     validationError.push('wrong id ^^')
        if (!validator.isLength(funnyInfo.nick, { min: 3, max: 15 }))
            validationError.push('wrong nick ^^')
        if (!validator.isIn(funnyInfo.way, ['brick', 'meow', 'jump', 'loneliness']))
            validationError.push('wrong way ^^')
        if (!validator.isLength(funnyInfo.info, { min: 0, max: 1000 }))
            validationError.push('too much info ^(')

        if (validationError.length) {
            res.status(400).send({ messages: validationError })
        } else {
            const funnyInfoDB = await FUN.create(funnyInfo)
            res.send(funnyInfoDB)
        }
    })

    app.listen(1337, function () {
        console.log('Server started!!! at http://localhost:1337');
    })
}

