const path = require('path');
const morgan = require('morgan');
const express = require('express');
const {renderIndex, saveNewContact, getAllContacts, renderUpdate, deleteAContact, updateContact} = require(path.join(__dirname, '..', 'controllers', 'principalRouter.controller.js'));
const {ENV} = require(path.join(__dirname, '..', 'config', 'config.js'));
const assets = path.join(__dirname, '..', 'assets');
const views_js = path.join(__dirname, '..', 'views_js');
const css = path.join(__dirname, '..', 'css');
const principalRouter = express.Router();
if(ENV == 'development') {
    principalRouter.use(morgan('dev'));
}

principalRouter.use(express.json())
principalRouter.use(express.urlencoded({extended:true}))
principalRouter.use('/public', express.static(assets));
principalRouter.use('/public', express.static(css));
principalRouter.use('/public', express.static(views_js));

principalRouter.get('/', renderIndex);
principalRouter.get('/contacts', getAllContacts);
principalRouter.get('/update/:id', renderUpdate);
principalRouter.post('/update/:id', updateContact);
principalRouter.get('/delete/:id', deleteAContact);
principalRouter.post('/contact/create', saveNewContact);

module.exports = {principalRouter}