const mongoose = require('mongoose')


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Data base connected successfully'))
    .catch((err) => console.log('Error when wonnection data base ', err.message))
