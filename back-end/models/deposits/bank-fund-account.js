const { Schema, model } = require('mongoose');
const { DEPOSIT_REGEX } = require('../../consts/deposit');
const getLastFourCharsOfHexTimestamp = () => Date.now().toString(16);

const BankFundAccountScheme = new Schema({
    account_number: { type: String, required: true, unique: true, default: getLastFourCharsOfHexTimestamp },
    cash_capital: {
        type: String, required: true, validate: {
            validator: (v) => {
                return DEPOSIT_REGEX.money.test(v);
            },
            message: props => `${props.value} invalid value`
        },
    },
    currency: {type: String, default: 'BYN', required: true},

})

module.exports = model('BankFundAccount', BankFundAccountScheme)