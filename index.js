const express = require('express')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
const app = express()
const path = require('path')


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

app.use('/uploads', express.static(
    path.join(__dirname, '/uploads')
))
app.listen(process.env.PORT || 5001, (error) => {
    if (error) {
        console.log(error.message)
    } else {
        console.log(`Listening on port ${process.env.PORT}`)
    }
})

module.exports = app