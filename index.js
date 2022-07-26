const express = require('express');
const app = express();
const path = require('path');
const {principalRouter} = require(path.join(__dirname, 'routers', 'principalRouter.router.js'));
const {PORT} = require(path.join(__dirname, 'config', 'config.js'));
const {connectDatabase} = require(path.join(__dirname, 'mysql', 'connection.js'));
const views = path.join(__dirname, 'views')

app
    .set('views', views)
    .set('view engine', 'pug')
app
    .use(principalRouter)

connectDatabase()
    .then( connectionStablished => {
        if(connectionStablished) {
            app
                .listen(PORT, () => console.log('Excecuting server on port %d', PORT))
        }
        else {
            console.error('Hubo un error conectando a la base de datos')
        }
    })

