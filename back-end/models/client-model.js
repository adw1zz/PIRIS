const { Schema, model } = require('mongoose');
const { CLIENT_REGEX, CLIENT_ENUMS } = require('../consts/clients');

const ClientSchema = new Schema({
    name: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.FCs.test(v);
            }, message: props => `${props.value} invalid string`
        }
    },
    surname: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.FCs.test(v);
            }, message: props => `${props.value} invalid string`
        }
    },
    patronymic: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.FCs.test(v);
            }, message: props => `${props.value} invalid string`
        }
    },
    birthdate: { type: Date, required: true },
    gender: { type: String, enam: CLIENT_ENUMS.gender, required: true },
    city_of_actual_residence: { type: String, enam: CLIENT_ENUMS.cities, required: true },
    address_of_the_actual_residence: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.text_address.test(v);
            },
            message: props => `${props.value} invalid string`
        }
    },
    home_phone: {
        type: String, required: false, validate:
        {
            validator: (v) => {
                return CLIENT_REGEX.home_phone.test(v) || v === '';
            },
            message: props => `${props.value} invalid string`
        },
    },
    mob_phone: {
        type: String, required: false, validate: {
            validator: (v) => {
                return CLIENT_REGEX.mob_phone.test(v) || v === '';
            },
            message: props => `${props.value} invalid string`
        },
        unique: true,
        sparse: true,
    },
    email: { type: String, required: false, unique: true, sparse: true },
    workplace: {
        type: String, required: false, default: '', validate: {
            validator: (v) => {
                return CLIENT_REGEX.job.test(v) || v === ''
            },
            message: props => `${props.value} invalid string`
        }
    },
    post: {
        type: String, required: false, default: '', validate: {
            validator: (v) => {
                return CLIENT_REGEX.job.test(v) || v === ''
            },
            message: props => `${props.value} invalid string`
        }
    },
    city_of_residence: { type: String, enam: CLIENT_ENUMS.cities, required: true },
    address_of_residence: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.text_address.test(v);
            },
            message: props => `${props.value} invalid string`
        }
    },
    marital_status: { type: String, enam: CLIENT_ENUMS.marital_status, required: true },
    citizenship: { type: String, enam: CLIENT_ENUMS.citizenship, required: true },
    retiree: { type: Boolean, required: true },
    monthly_cash_income: {
        type: String, required: false, validate: {
            validator: (v) => {
                return CLIENT_REGEX.money.test(v) || v === '';
            },
            message: props => `${props.value} invalid string`
        },
        default: ''
    },
    liable: { type: Boolean, required: true }
})

module.exports = model('Client', ClientSchema);