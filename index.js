const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const app = express()

require('dotenv').config()
require('./config/connectDb.config')

const productRouter = require('./routes/product.route')

app.use(morgan('dev'))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(fileUpload({
    createParentPath: true
}))


app.use('/api/product', productRouter)

app.listen(process.env.PORT || 5001, (error) => {
    if (error) {
        console.log(error.message)
    } else {
        console.log(`Listening on port ${process.env.PORT}`)
    }
})

module.exports = app