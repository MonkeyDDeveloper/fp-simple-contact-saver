const form = document.querySelector('form');
const tableBody = document.querySelector('tbody');
const messageArea = document.querySelector('.message_area');
const tableFragment = document.querySelector('template').content;
function showMessage (type, message) {
    messageArea.innerHTML = `<p class="${type}">${message}</p>`
}
function addListeners () {
    let updateButtons = document.querySelectorAll('.update');
    let deleteButtons = document.querySelectorAll('.delete');
    updateButtons.forEach(button => {
        button.onclick = event => {
            event.preventDefault()
            window.location.replace(`update/${button.id}`)
        }
    })
    deleteButtons.forEach(button => {
        button.onclick = event => {
            event.preventDefault()
            fetch(`delete/${button.id}`)
                .then( response => {
                    if(response.status == 200) {
                        window.location.reload()
                    }
                })
        }
    })
}
function getContacts () {
    fetch('contacts')
        .then( response => response.json() )
        .then( res => {
            if(res.success) {
                let fragment = document.createDocumentFragment();
                res.contacts.forEach( contact => {
                    tableFragment.querySelector('.name').textContent = contact.contact_name;
                    tableFragment.querySelector('.email').textContent = contact.contact_email;
                    tableFragment.querySelector('.number').textContent = contact.contact_number;
                    tableFragment.querySelector('.update').id = contact.id_contact;
                    tableFragment.querySelector('.delete').id = contact.id_contact;
                    let clone = document.importNode(tableFragment, true);
                    fragment.appendChild(clone);
                })
                tableBody.appendChild(fragment);
                showMessage('success', `Contactos guardados actualmente`)
                addListeners()
            }
            else throw new Error(res.err_message)
        })
        .catch( err => {
            showMessage('fail', `Hubo un error procesando la petición: ${err.message}`)
        })
}
form.onsubmit = event => {
    event.preventDefault();
    let data = Object.fromEntries(new FormData(form).entries());
    fetch('contact/create/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then( response => response.json() )
        .then( res => {
            if(res.success) {
                window.location.reload()
            }
            else throw new Error(res.err_message)
        })
        .catch( err => {
            showMessage('fail', `Hubo un error procesando la petición: ${err.message}`)
        })
}
getContacts()