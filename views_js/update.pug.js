const form = document.querySelector('form')
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
        else {
            console.log(res.err_message)
        }
    })
}