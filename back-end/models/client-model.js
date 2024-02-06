const { Schema, model } = require('mongoose');
const CLIENT_REGEX = require('../consts/client-regex');

const ClientSchema = new Schema({
    name: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.FCs.test(v);
            }, message: props => `${props.value} must be ru symbols only`
        }
    },
    surname: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.FCs.test(v);
            }, message: props => `${props.value} must be ru symbols only`
        }
    },
    patronymic: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.FCs.test(v);
            }, message: props => `${props.value} must be ru symbols only`
        }
    },
    birthdate: { type: Date, required: true },
    gender: { type: String, enam: ['Мужчина', 'Женщина'], required: true },
    city_of_actual_residence: { type: String, enam: ['Минск', 'Гродно', 'Брест', 'Витебск', 'Гомель'], required: true },
    address_of_the_actual_residence: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.text_address.test(v);
            },
            message: props => `${props.value} must be ru symbols only`
        }
    },
    home_phone: {
        type: String, required: false, validate:
        {
            validator: (v) => {
                return CLIENT_REGEX.home_phone.test(v) || v === '';
            },
            message: props => `${props.value} must be 7 num symbols`
        },
        default: '',
    },
    mob_phone: {
        type: String, required: false, validate: {
            validator: (v) => {
                return CLIENT_REGEX.mob_phone.test(v) || v === '';
            },
            message: props => `${props.value} must be 13 symbols and starts with +375`
        },
        default: '',
        unique: true,
        sparse: true,
    },
    email: { type: String, required: false, default: '', unique: true, sparse: true },
    workplace: {
        type: String, required: false, default: '', validate: {
            validator: (v) => {
                return CLIENT_REGEX.job.test(v) || v === ''
            },
            message: props => `${props.value} must be "ru" and/or "en" symbols with/without "." / " " and quotation marks`
        }
    },
    post: {
        type: String, required: false, default: '', validate: {
            validator: (v) => {
                return CLIENT_REGEX.job.test(v) || v === ''
            },
            message: props => `${props.value} must be "ru" and/or "en" symbols with/without "." / " " and quotation marks`
        }
    },
    city_of_residence: { type: String, enam: ['Минск', 'Гродно', 'Брест', 'Витебск', 'Гомель'], required: true },
    address_of_residence: {
        type: String, required: true, validate: {
            validator: (v) => {
                return CLIENT_REGEX.text_address.test(v);
            },
            message: props => `${props.value} must be ru symbols only`
        }
    },
    marital_status: { type: String, enam: ['Женат', 'Замужем', 'Не женат', 'Не замужем'], required: true },
    citizenship: { type: String, enam: ['РБ', 'РФ'], required: true },
    retiree: { type: Boolean, required: true },
    monthly_cash_income: {
        type: String, required: false, validate: {
            validator: (v) => {
                return CLIENT_REGEX.money.test(v) || v === '';
            },
            message: props => `${props.value} must be cash value`
        },
        default: ''
    },
    liable: { type: Boolean, required: true }
})

module.exports = model('Client', ClientSchema);