const mongoose = require("mongoose")

if (process.env.NODE_ENV === 'development') {

    module.exports = () => {
        mongoose.connect(process.env.local_db_uri).then(con => {
            console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
        })
    }
}
else{
    module.exports = () => {
        mongoose.connect(process.env.server_db_uri).then(con => {
            console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
        })
    }
}

