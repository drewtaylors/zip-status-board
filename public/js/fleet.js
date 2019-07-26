const searchForm = document.querySelector('#fleet-search-form')
const search = document.querySelector('#fleet-search')
const fleetTable = document.querySelector('#fleet-table')

const tableProperties = ['zipNumber', 'updatedAt', 'isHealthy']

var header = fleetTable.createTHead().insertRow()
tableProperties.forEach((property) => {
    var cell = document.createElement('th')
    cell.textContent = property
    header.appendChild(cell)
})

fetch('/api/zips?sortBy=updatedAt_desc').then((response) => {
    response.json().then((zips) => {
        if (zips.length === 0 || zips.error) {
            fleetTable.textContent = 'No zips found.'
        }

        var body = fleetTable.appendChild(document.createElement('tbody'))
        generateTableBody(body, zips)
    }).catch((e) => {
        console.log(e)
        fleetTable.textContent = 'No zips found.'
    })
})

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const zipNumber = search.value
    
    fetch('/api/zips/' + zipNumber).then((response) => {
        response.json().then((zips) => {
            if (zips.error) {
                tableError()
            } else {
                fleetTable.removeChild(document.querySelector('tbody'))
                var body = fleetTable.appendChild(document.createElement('tbody'))
                generateTableBody(body, zips)
            }
        }).catch((e) => {
            tableError()
        })
    })
})

searchForm.addEventListener('reset', (e) => {
    e.preventDefault()

    fetch('/api/zips?sortBy=updatedAt_desc').then((response) => {
        response.json().then((zips) => {
            if (zips.error) {
                tableError()
            }

            fleetTable.removeChild(document.querySelector('tbody'))
            var body = fleetTable.appendChild(document.createElement('tbody'))
            generateTableBody(body, zips)
        }).catch((e) => {
            tableError()
        })
    })
})

const tableError = () => {
    fleetTable.removeChild(document.querySelector('tbody'))
    var body = fleetTable.appendChild(document.createElement('tbody'))
    body.textContent = 'No zips found.'
}

// Generates HTML table from response data
const generateTableBody = (body, zips) => {
    if (Array.isArray(zips)) {
        zips.forEach((zip) => {
            var row = body.insertRow()
            
            tableProperties.forEach((property) => {
                var cell = row.insertCell()
                if (property === "updatedAt") {
                    var time = new Date(zip[property])
                    cell.innerHTML = `<a href="/fleet/${zip.zipNumber}">${time}</a>`
                } else {
                    cell.innerHTML = `<a href="/fleet/${zip.zipNumber}">${zip[property]}</a>`
                }
            })
        })
    } else {
        var row = body.insertRow()

        tableProperties.forEach((property) => {
            var cell = row.insertCell()
            if (property === "updatedAt") {
                var time = new Date(zips[property])
                cell.innerHTML = `<a href="/fleet/${zips.zipNumber}">${time}</a>`
            } else {
                cell.innerHTML = `<a href="/fleet/${zips.zipNumber}">${zips[property]}</a>`
            }
        })
    }
}
