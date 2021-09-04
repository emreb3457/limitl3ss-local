const app = require('./app')
const connectDatabase = require('./utils/database')

// Handle Uncaught exceptions
process.on('uncaughtException', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down due to uncaught exception');
    process.exit(1)
})

// Setting up config file
require('dotenv').config({ path: 'config/config.env' })


// Connecting to database
connectDatabase();

const SERVER_PORT = process.env.port || process.env.PORT || 3001;
console.log(process.env.port)
const server = app.listen(SERVER_PORT, () => {
    console.log(`Server started on PORT: ${SERVER_PORT} in ${process.env.NODE_ENV} mode.`)
})

// Handle Unhandled Promise rejections
process.on('unhandledRejection', err => {
    console.log(`ERROR: ${err.stack}`);
    console.log('Shutting down the server due to unhandled promise rejection');
    server.close(() => {
        process.exit(1)
    })
})