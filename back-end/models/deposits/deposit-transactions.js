const { Schema, model } = require('mongoose');
const { DEPOSIT_REGEX, DEPOSIT_ENUMS } = require('../../consts/deposit');

const DepositTransactionsScheme = new Schema({
    type: {type: String, enum: DEPOSIT_ENUMS.deposit_transactions_type, required: true},
    target_iban: {
        type: String, required: true, validate: {
            validator: (v) => {
                return DEPOSIT_REGEX.iban.test(v);
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
})

module.exports = model('DepositTransactions', DepositTransactionsScheme);