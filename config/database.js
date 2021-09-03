const mongoose = require("mongoose")

if (process.env.NODE_ENV === 'DEVELOPMENT') {

    module.exports = () => {
        mongoose.connect(process.env.DB_LOCAL_URI).then(con => {
            console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
        })
    }
}
else{
    module.exports = () => {
        mongoose.connect(process.env.DB_URI).then(con => {
            console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
        })
    }
}

