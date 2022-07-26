const path = require('path');
const {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME} = require(path.join(__dirname, '..', 'config', 'config.js'));
const mysql = require('mysql2');
const contactsConnection = mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
})

function connectDatabase () {
    return new Promise( (res, rej) => {
        contactsConnection.connect( err => {
            if(err) res(false)
            else {
                console.log('Base de datos conectada correctamente')
                res(true)
            }
        })
    })
}

module.exports = {
    connectDatabase,
    contactsConnection
}

