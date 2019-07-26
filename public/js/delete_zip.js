const deleteZipForm = document.querySelector('#delete-zip-form')
const input = document.querySelector('#zip-number-input')
const statusMessage = document.querySelector('#status-message')

deleteZipForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const zipNumber = input.value

    await fetch('/api/zips/' + zipNumber, {
        method: 'DELETE'
    })
    .then((response) => {
        response.json().then((zip) => {
            if (zip.errors) {
                statusMessage.textContent = 'Error: Zip number must be an integer.'
            } else {
                statusMessage.textContent = `Success: Deleted Zip ${zipNumber} and all associated tasks.`
                input.value = ''
            }
        })
    }).catch((error) => {
        console.log(error)
    })
})