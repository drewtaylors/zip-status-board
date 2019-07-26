const zipNumber = document.querySelector('#zip-number')
const description = document.querySelector('#description')
const isBlocking = document.querySelector('#is-blocking')
const isComplete = document.querySelector('#is-complete')
const updatedStatus = document.querySelector('#updated-status')
const createdStatus = document.querySelector('#created-status')
const updateTaskForm = document.querySelector('#update-task-form')
const completeInput = document.querySelector('#is-complete-box')
const updateTaskButton = document.querySelector('#update-task-button')
const statusMessage = document.querySelector('#status-message')

// Determine task ID from URL
const taskID = window.location.pathname.match(/[a-zA-Z0-9]+$/)[0]

fetch('/api/tasks/' + taskID).then((response) => {
    response.json().then((task) => {
        if (task.length === 0 || task.error) {
            throw new Error('No task found with that ID.')
        }

        var updatedTime = new Date(task.updatedAt)
        var createdTime = new Date(task.createdAt)

        zipNumber.textContent = `Zip Number: ${task.zipNumber}`
        description.textContent = `Description: ${task.description}`
        isBlocking.textContent = `Blocks Flight: ${task.isBlocking}`
        updatedStatus.textContent = `Updated: ${updatedTime}`
        createdStatus.textContent = `Created: ${createdTime}`
    }).catch((e) => {
        zipNumber.value = e
    })
})

updateTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const isComplete = completeInput.checked
    await fetch('/api/tasks/' + taskID, {
        method: 'PATCH',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
            isComplete: isComplete
        })
    }).then((response) => {
        response.json().then((task) => {
            console.log(task)
            if (task.errors) {
                textContent = 'Error: Cannot update task at this time.'
            } else {
                isComplete.textContent = task.isComplete
                updatedStatus.textContent = `Updated: ${Date(task.updatedAt)}`
                statusMessage.innerHTML = `<p>Success: Updated Task ${task._id}!</p>`
            }
        })
    }).catch((error) => {
        console.log(error)
    })
})