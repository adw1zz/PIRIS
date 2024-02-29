const { Schema, model } = require('mongoose');
const { CLIENT_REGEX, CLIENT_ENUMS } = require('../consts/clients');

const ClientSchema = new Schema({
    name: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.FCs.test(v);
            }, message: props => `${props.value} invalid value`
        }
    },
    surname: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.FCs.test(v);
            }, message: props => `${props.value} invalid value`
        }
    },
    patronymic: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.FCs.test(v);
            }, message: props => `${props.value} invalid value`
        }
    },
    birthdate: { type: Date, required: true },
    gender: { type: String, enam: CLIENT_ENUMS.gender, required: true },
    passport_number: {
        type: String, required: true, unique: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.passport_number.test(v);
            },
            message: props => `${props.value} invalid value`
        }
    },
    issued_by: { type: String, required: true },
    issue_date: { type: Date, required: true },
    passport_id_number: {
        type: String, required: true, unique: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.passport_id_number.test(v);
            },
            message: props => `${props.value} invalid value`
        }
    },
    city_of_actual_residence: { type: String, enam: CLIENT_ENUMS.cities, required: true },
    address_of_the_actual_residence: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.text_address.test(v);
            },
            message: props => `${props.value} invalid value`
        }
    },
    home_phone: {
        type: String, required: false, default: '', validate:
        {
            validator: (v) => {
                return CLIENT_REGEX.home_phone.test(v) || v === '';
            },
            message: props => `${props.value} invalid value`
        },
    },
    mob_phone: {
        type: String, required: false, validate: {
            validator: (v) => {
                return CLIENT_REGEX.mob_phone.test(v) || v === '';
            },
            message: props => `${props.value} invalid value`
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
            message: props => `${props.value} invalid value`
        }
    },
    post: {
        type: String, required: false, default: '', validate: {
            validator: (v) => {
                return CLIENT_REGEX.job.test(v) || v === ''
            },
            message: props => `${props.value} invalid value`
        }
    },
    city_of_residence: { type: String, enam: CLIENT_ENUMS.cities, required: true },
    address_of_residence: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.text_address.test(v);
            },
            message: props => `${props.value} invalid value`
        }
    },
    marital_status: { type: String, enam: CLIENT_ENUMS.marital_status, required: true },
    citizenship: { type: String, enam: CLIENT_ENUMS.citizenship, required: true },
    disability: { type: String, enum: CLIENT_ENUMS.disability, required: true },
    retiree: { type: Boolean, required: true },
    monthly_cash_income: {
        type: String, required: false, validate: {
            validator: (v) => {
                return CLIENT_REGEX.money.test(v) || v === '';
            },
            message: props => `${props.value} invalid value`
        },
        default: ''
    },
    liable: { type: Boolean, required: true }
})

module.exports = model('Client', ClientSchema);