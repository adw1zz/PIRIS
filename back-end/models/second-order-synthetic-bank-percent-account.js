const { Schema, model } = require('mongoose');

const SUM_REGEX = /^\d{1,3}(\.\d{3})*,\d{2}$/;
const IBAN = /^BY\d{2}ZEPT\d{4}[A-Z0-9]{16}$/;

const SecondOrderSyntheticBankPercentAccountScheme = new Schema({
    account_number: { type: String, required: true, unique: true }, //номер счета синт вт порядка
    sum: { 
        type: String, required: true, validate: {
            validator: (v) => {
                return SUM_REGEX.test(v);
            },
            message: props => `${props.value} invalid value`
        },
        default: "0.000,00"
    },
    currency: { type: String, default: 'BYN', required: true },
    client_iban: {
        type: String, required: true,
        validate: {
            validator: (v) => {
                return IBAN.test(v);
            },
            message: props => `${props.value} invalid value`
        },
    },
})

module.exports = model('SecondOrderSyntheticBankPercentAccount', SecondOrderSyntheticBankPercentAccountScheme);