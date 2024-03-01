const { Schema, model } = require('mongoose');
const { DEPOSIT_REGEX } = require('../../consts/deposit');

const SecondOrderSyntheticBankPercentAccountScheme = new Schema({
    account_number: {
        type: String, required: true, unique: true, validate: {
            validator: (v) => {
                return DEPOSIT_REGEX.second_order_synthetic_bank_precent_account_number.test(v);
            },
            message: props => `${props.value} invalid value`
        },
    },
    sum: {
        type: String, required: true, validate: {
            validator: (v) => {
                return DEPOSIT_REGEX.money.test(v);
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
                return DEPOSIT_REGEX.iban.test(v);
            },
            message: props => `${props.value} invalid value`
        },
    },
})

module.exports = model('SecondOrderSyntheticBankPercentAccount', SecondOrderSyntheticBankPercentAccountScheme);