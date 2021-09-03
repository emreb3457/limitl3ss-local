const mongoose = require("mongoose")

module.exports = () => {
    mongoose.connect(process.env.DB_LOCAL_URI).then(con => {
        console.log(`MongoDB Database connected with HOST: ${con.connection.host}`)
    })
}
