const mongoose = require('mongoose')

const MONGODB_URL= 'mongodb://127.0.0.1:27017/zip-status-board'
// const MONGODB_URL = process.env.MONGODB_URL || 'mongodb+srv://zip-status-board:zipline@cluster0-ecx5o.mongodb.net/zip-status-board?retryWrites=true'

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log(`Connected to MongoDB collection: ${MONGODB_URL}`)
}).catch((error) => {
    console.log(`Failed to connect to MongoDB collection: ${MONGODB_URL}`)
})