const { Schema, model } = require('mongoose');

const ClientSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    patronymic: { type: String, required: true },
    birthdate: { type: Date, required: true },
    gender: { type: String, enam: ['Мужчина', 'Женщина'], required: true },
    city_of_actual_residence: { type: String, enam: ['Минск', 'Гродно', 'Брест', 'Витебск', 'Гомель'], required: true },
    address_of_the_actual_residence: { type: String, required: true },
    home_phone: {
        type: String, required: false, validate:
        {
            validator: (v) => {
                return v.length = 7;
            },
            message: props => `${props.value} must be 7 symbols`
        },
        default: '-'
    },
    mob_phone: {
        type: String, required: false, validate: [
            {
                validator: (v) => {
                    return v.length = 13
                },
                message: props => `${props.value} must be 13 symbols`
            },
            {
                validator: (v) => {
                    return v.startsWith('+375')
                },
                message: props => `${props.value} number should begin with +375`
            }
        ],
        default: '-'
    },
    email: { type: String, required: false, default: '-' },
    workplace: { type: String, required: false, default: '-' },
    post: { type: String, required: false, default: '-' },
    city_of_residence: { type: String, enam: ['Минск', 'Гродно', 'Брест', 'Витебск', 'Гомель'], required: true },
    address_of_residence: { type: String, required: true },
    marital_status: { type: String, enam: ['Женат', 'Замужем', 'Не женат', 'Не замужем'], required: true },
    citizenship: {type: String, enam: ['РБ', 'РФ'], required: true},
    retiree: {type: Boolean, required: true},
    monthly_cash_income: {type: String, required: false, default: '-'},
    liable: {type: Boolean, required: true}
})

module.exports = model('Client', ClientSchema);