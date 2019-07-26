const deleteTaskForm = document.querySelector('#delete-task-form')
const input = document.querySelector('#task-id-input')
const statusMessage = document.querySelector('#status-message')

deleteTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const taskID = input.value

    await fetch('/api/tasks/' + taskID, {
        method: 'DELETE'
    })
    .then((response) => {
        response.json().then((zip) => {
            if (zip.errors) {
                statusMessage.textContent = 'Error: Task ID not found.'
            } else {
                statusMessage.textContent = `Success: Deleted Task ${taskID}.`
                input.value = ''
            }
        }).catch((e) => {
            statusMessage.textContent = 'Error: Task ID not found.'
        })
    }).catch((error) => {
        console.log(error)
    })
})