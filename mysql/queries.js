const path = require('path');
const {contactsConnection} = require(path.join(__dirname, '..', 'mysql', 'connection.js'));
function saveNewContactQuery (contactInformation) {
    return new Promise( (res, rej) => {
        try {
            let {name, email, phone} = contactInformation;
            let instruction = `INSERT INTO contacts_table VALUES (${null}, "${name}", "${email}", "${phone}")`
            contactsConnection.query(instruction, (err, results) => {
                if (err) rej(err)
                else {
                    res(true)
                }
            });
        }
        catch (err) {
            rej(err)
        }
    })
}
function getAllContactsQuery () {
    return new Promise ( (res, rej) => {
        try {
            let instruction = `SELECT * FROM contacts_table`
            contactsConnection.query(instruction, (err, results) => {
                if(err) rej(err)
                else {
                    res(results)
                }
            })
        }
        catch (err) {
            rej(err)
        }
    })
}
function deleteAContactQuery (id) {
    return new Promise((res, rej) => {
        try{
            let instruction = `DELETE FROM contacts_table WHERE id_contact=${id}`
            contactsConnection.query(instruction, (err, result) => {
                if (err) rej(err)
                else res(true)
            })
        }
        catch(err) {
            rej(err)
        }
    })
}
function findOneQuery (id) {
    return new Promise ((res, rej) => {
        try {
            let instruction = `SELECT * FROM contacts_table WHERE id_contact=${id}`
            contactsConnection.query(instruction, (err, results) => {
                if (err) rej(err)
                else {
                    res(results)
                }
            })
        }
        catch (err) {
            rej(err)
        }
    })
}
function updateContactQuery(id, newData){
    return new Promise ((res, rej) => {
        try {
            let {contact_name, contact_email, contact_number} = newData;
            let instruction = `UPDATE contacts_table SET contact_name="${contact_name}", contact_email="${contact_email}", contact_number="${contact_number}" WHERE id_contact=${id}`
            contactsConnection.query(instruction, (err, result) => {
                if(err) rej(err)
                else res(true)
            })
        }
        catch(err){
            rej(err)
        }
    })
}
module.exports = {
    updateContactQuery,
    deleteAContactQuery,
    saveNewContactQuery,
    getAllContactsQuery,
    findOneQuery
}