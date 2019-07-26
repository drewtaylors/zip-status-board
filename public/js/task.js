const zipNumber = document.querySelector('#zip-number')
const description = document.querySelector('#description')
const isBlocking = document.querySelector('#is-blocking')
const isComplete = document.querySelector('#is-complete')
const updatedStatus = document.querySelector('#updated-status')
const createdStatus = document.querySelector('#created-status')
const updateTaskButton = document.querySelector('#update-task-button')

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
        isComplete.textContent = `Completed: ${task.isComplete}`
        updatedStatus.textContent = `Updated: ${updatedTime}`
        createdStatus.textContent = `Created: ${createdTime}`
    }).catch((e) => {
        zipNumber.value = e
    })
})

updateTaskButton.innerHTML = `<a href="/maintenance/update/${taskID}">Update</a></button>`
