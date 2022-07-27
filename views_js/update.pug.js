const form = document.querySelector('form');
const messageArea = document.querySelector('.message_area');
function showMessage (type, message) {
    messageArea.innerHTML = `<p class="${type}">${message}</p>`
}
form.onsubmit = event => {
    event.preventDefault()
    let newData = Object.fromEntries(new FormData(form).entries())
    let id = form.querySelector('button').getAttribute('id')
    fetch(`/update/${id}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newData)
    })
    .then( response => response.json())
    .then( res => {
        if(res.success){
            window.location.replace('/')
        }
        else throw new Error(res.err_message)
    })
    .catch( err => {
        showMessage('fail', `Hubo un error procesando la petición: ${err.message}`)
    })
}