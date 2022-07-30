const path = require('path');
const {DB_URL} = require(path.join(__dirname, '..', 'config', 'config.js'));
const mysql = require('mysql2');
const contactsConnection = mysql.createConnection(DB_URL)

function connectDatabase () {
    return new Promise( (res, rej) => {
        contactsConnection.connect( err => {
            if(err) {
                console.log(err.message)
                res(false)
            }
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

