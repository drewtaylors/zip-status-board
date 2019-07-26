const taskTable = document.querySelector('#task-table')
const healthStatus = document.querySelector('#health-status')
const updatedStatus = document.querySelector('#updated-status')
const createdStatus = document.querySelector('#created-status')

const tableProperties = ['zipNumber', 'description', 'isBlocking', 'isComplete']
// Determine zip number from URL
const zipNumber = window.location.pathname.match(/\d+/)[0]

var header = taskTable.createTHead().insertRow()
tableProperties.forEach((property) => {
    var cell = document.createElement('th')
    cell.textContent = property
    header.appendChild(cell)
})

fetch('/api/zips/' + zipNumber).then((response) => {
    response.json().then((zip) => {
        if (zip.error) {
            healthStatus.textContent = 'No zip found.'
        } else {
            var updatedTime = new Date(zip.updatedAt)
            var createdTime = new Date(zip.createdAt)
            healthStatus.textContent = `Flyable: ${zip.isHealthy}`
            updatedStatus.textContent = `Updated: ${updatedTime}`
            createdStatus.textContent = `Created: ${createdTime}`
        }
    }).catch((e) => {
        healthStatus.textContent = 'No zip found.'
    })
})

fetch('/api/tasks?zipNumber=' + zipNumber).then((response) => {
    response.json().then((tasks) => {
        if (tasks.length === 0 || tasks.error) {
            taskTable.textContent = 'No tasks found.'
        }

        var body = taskTable.appendChild(document.createElement('tbody'))
        generateTableBody(body, tasks)
    }).catch((e) => {
        taskTable.textContent = 'No tasks found.'
    })
})

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

        for (var property in tasks) {
            var cell = row.insertCell()
            cell.textContent = `<a href="/maintenance/${tasks._id}">${tasks[property]}</a>`
        }
    }
}
