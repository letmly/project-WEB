const jwt = require('jsonwebtoken')
const secret = 'top_secret'
const bcryptjs = require('bcryptjs')


function createToken(userFromDB) {
    const token = jwt.sign({ id: userFromDB.id, role: userFromDB.role }, secret,
        { expiresIn: "5h" })
    return 'bearer ' + token
}

function verifyToken(req, res, next) {
    if (req.headers['authorization'] && req.headers['authorization'].length) {
        const token = req.headers['authorization'].replace(/(bearer|jwt)\s+/, '')
        jwt.verify(token, secret, (err, decodedToken) => {
            if (err) {
                return res.status(401).send({ message: "ТЫ КУДА ЗВОНИШЬ?" })
            }
            req.credentials = { id: decodedToken.id }
            next()
        })
    }
    else {
        return res.status(401).send({ message: "ТЫ КУДА ЗВОНИШЬ?" })
    }
}

function createPasswordHash(password) {
    const salt = bcryptjs.genSaltSync(10)
    return bcryptjs.hashSync(password, salt)
}

function comparePassword(password, hash) {
    if (typeof password == 'string') return bcryptjs.compareSync(password, hash)
    else return false
}

module.exports = {
    createToken,
    comparePassword,
    createPasswordHash,
    verifyToken,
}
