const isEmpty = require('./isEmpty')
const validator = require('validator')


const validateProduct = (data) => {

    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : ''
    data.price = !isEmpty(data.price) ? data.price : ''


    if (validator.isEmpty(data.name)) {
        errors.nameError = 'Product name is required'
    }

    if (validator.isEmpty(data.price)) {
        errors.priceError = 'Product price is required'
    }

    if (parseFloat(data.price) <= 0) {
        errors.priceError = 'Product price must be bigger than 0'
    }

    return {
        errors,
        valid: isEmpty(errors)
    }
}


module.exports = validateProduct