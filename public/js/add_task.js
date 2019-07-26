const addTaskForm = document.querySelector('#add-task-form')
const zipNumberInput = document.querySelector('#zip-number-input')
const descriptionInput = document.querySelector('#description-input')
const blockingInput = document.querySelector('#is-blocking-box')
const completeInput = document.querySelector('#is-complete-box')
const statusMessage = document.querySelector('#status-message')

addTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const zipNumber = zipNumberInput.value
    const description = descriptionInput.value
    const isBlocking = blockingInput.checked
    const isComplete = completeInput.checked
    await fetch('/api/tasks', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
            zipNumber: zipNumber,
            description: description,
            isBlocking: isBlocking,
            isComplete: isComplete
        })
    }).then((response) => {
        response.json().then((task) => {
            if (task.errors) {
                if (task.errors.hasOwnProperty('zipNumber')) {
                    statusMessage.textContent = 'Error: Must include a zip number.'
                } else if (task.errors.hasOwnProperty('description')) {
                    statusMessage.textContent = 'Error: Must include a description.'
                } else {
                    statusMessage.textContent = 'Error: Cannot add a task at this time.'
                }
            } else {
                statusMessage.textContent = `Success: Added Task ${task._id}!`
                zipNumberInput.value = ''
                descriptionInput.value = ''
                blockingInput.checked = false
                completeInput.checked = false
            }
        })
    }).catch((error) => {
        console.log(error)
    })
})