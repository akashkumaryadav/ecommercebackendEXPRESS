const mongoose = require('mongoose')

const connect = function connectDB() {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('database connected')
    })
    .catch((err) => {
      console.error(err)
    })
}

module.exports = connect
