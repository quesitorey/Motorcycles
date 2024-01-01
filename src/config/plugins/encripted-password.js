const bcrypt = require('bcrypt')

const encryptPassword = async (password) => {
    const salto = await bcrypt.genSalt(12)
    return await bcrypt.hash(password, salto)
}

const verifyPassword = async (bodyPassword, userPassword) => {
    return await bcrypt.compare(bodyPassword, userPassword)
}

module.exports = {
    encryptPassword,
    verifyPassword
}