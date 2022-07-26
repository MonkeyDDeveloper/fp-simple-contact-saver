const form = document.querySelector('form');
const tableBody = document.querySelector('tbody');
const tableFragment = document.querySelector('template').content;
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
        .then( response => {
            if(response.status != 200) throw new Error('Error interno del servidor');
            else return response.json();
        })
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
                addListeners()
            }
            else {
                console.log(res.err_message);
            }
        })
        .catch( err => {
            console.log(err.message);
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
        .then( response => {
            if(response.status != 200) throw new Error('Error interno del servidor')
            else return response.json()
        })
        .then( res => {
            if(res.success) {
                window.location.reload()
            }
            else {
                console.log(res.err_message)
            }
        })
        .catch( err => {
            console.log(err.message)
        })
}
getContacts()