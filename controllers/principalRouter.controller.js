const path = require('path');
const {saveNewContactQuery, getAllContactsQuery, deleteAContactQuery, findOneQuery, updateContactQuery} = require(path.join(__dirname, '..', 'mysql', 'queries.js'));
function renderIndex (req, res) {
    res.render('index.pug')
}
async function renderUpdate (req, res) {
    let [contact_data] = await findOneQuery(req.params.id)
    res.render('update.pug', {
        contact_data
    })
}
async function deleteAContact (req, res) {
    try {
        let id = req.params.id
        await deleteAContactQuery(id)
        res.status(200)
        res.json({
            success: true,
            success_message: null,
            err_message: null
        })
    }
    catch (err) {
        res.status(500)
        console.log(err.message)
        res.json({
            success: false,
            success_message: null,
            err_message: `Hubo un error borrando el contacto: ${err.message}`
        })
    }
}
async function saveNewContact (req, res) {
    try {
        await saveNewContactQuery(req.body)
        res.status(200)
        res.json({
            success: true,
            success_message: 'Datos guardados correctamente',
            err_message: null
        })
    }
    catch (err) {
        res.status(500)
        res.json({
            success: false,
            success_message: null,
            err_message: err.message
        })
        console.log(`Hubo un error guardando el nuevo contacto: ${err.message}`)
    }
}
async function getAllContacts (req, res) {
    try {
        let contacts = await getAllContactsQuery()
        res.status(200)
        res.json({
            success: true,
            success_message: 'Datos obtenidos correctamente',
            err_message: null,
            contacts
        })
    }
    catch (err) {
        res.status(500)
        res.json({
            success: false,
            success_message: null,
            err_message: `Error obteniendo los contactos de la base de datos: ${err.message}`,
            contacts: null
        })
    }
}
async function updateContact (req, res) {
    try {
        await updateContactQuery(req.params.id, req.body)
        res.status(200)
        res.json({
            success: true,
            success_message: null,
            err_message: null
        })
    }
    catch(err) {
        res.status(500)
        res.json({
            success: false,
            success_message: null,
            err_message: `Hubo un error actualizando el contacto: ${err.message}`
        })
    }
}
module.exports = {
    renderUpdate,
    updateContact,
    deleteAContact,
    saveNewContact,
    getAllContacts,
    renderIndex
}