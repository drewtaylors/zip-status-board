const searchForm = document.querySelector('#task-search-form')
const search = document.querySelector('#task-search')
const taskTable = document.querySelector('#task-table')

const tableProperties = ['zipNumber', 'description', 'isBlocking', 'isComplete']

var header = taskTable.createTHead().insertRow()
tableProperties.forEach((property) => {
    var cell = document.createElement('th')
    cell.textContent = property
    header.appendChild(cell)
})

fetch('/api/tasks?sortBy=updatedAt_desc').then((response) => {
    response.json().then((tasks) => {
        if (tasks.length === 0 | tasks.error) {
            taskTable.textContent = 'No tasks found.'
        }

        var body = taskTable.appendChild(document.createElement('tbody'))
        generateTableBody(body, tasks)
    }).catch((e) => {
        taskTable.textContent = 'No tasks found.'
    })
})

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const zipNumber = search.value
    
    fetch('/api/tasks?zipNumber=' + zipNumber).then((response) => {
        response.json().then((tasks) => {
            console.log(tasks)
            if (tasks.length === 0 || tasks.error) {
                tableError()
            } else {
                taskTable.removeChild(document.querySelector('tbody'))
                var body = taskTable.appendChild(document.createElement('tbody'))
                generateTableBody(body, tasks)
            }
        }).catch((e) => {
            tableError()
        })
    }).catch((e) => {
        tableError()
    })
})

searchForm.addEventListener('reset', (e) => {
    e.preventDefault()

    fetch('/api/tasks?sortBy=updatedAt_desc').then((response) => {
        response.json().then((tasks) => {
            if (tasks.error) {
                tableError()
            }

            taskTable.removeChild(document.querySelector('tbody'))
            var body = taskTable.appendChild(document.createElement('tbody'))
            generateTableBody(body, tasks)
        }).catch((e) => {
            tableError()
        })
    })
})

// 
const tableError = () => {
    taskTable.removeChild(document.querySelector('tbody'))
    var body = taskTable.appendChild(document.createElement('tbody'))
    body.textContent = 'No tasks found.'
}

// Generates HTML table from response data
const generateTableBody = (body, tasks) => {
    if (Array.isArray(tasks)) {
        tasks.forEach((task) => {
            var row = body.insertRow()

            tableProperties.forEach((property) => {
                var cell = row.insertCell()
                cell.innerHTML = `<a href="/maintenance/${task._id}">${task[property]}</a>`
            })
        })
    } else {
        var row = body.insertRow()

        tableProperties.forEach((property) => {
            var cell = row.insertCell()
            cell.innerHTML = `<a href="/maintenance/${tasks._id}">${tasks[property]}</a>`
        })
    }
}
