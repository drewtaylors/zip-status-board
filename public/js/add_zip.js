const addZipForm = document.querySelector('#add-zip-form')
const input = document.querySelector('#zip-number-input')
const statusMessage = document.querySelector('#status-message')

addZipForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const zipNumber = input.value

    await fetch('/api/zips', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ zipNumber })
    })
    .then((response) => {
        response.json().then((zip) => {
            console.log(zip.errors)
            if (zip.errmsg) {
                statusMessage.textContent = 'Error: Cannot add a duplicate zip number.'
            } else if (zip.zipNumber.message) {
                statusMessage.textContent = zip.zipNumber.message
            } else {
                statusMessage.textContent = `Success: Added Zip ${zipNumber}!`
                input.value = ''
            }
        })
    }).catch((error) => {
        console.log(error)
    })
})