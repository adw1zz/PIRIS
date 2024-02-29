const { Schema, model } = require('mongoose');

const SUM_REGEX = /^\d{1,3}(\.\d{3})*,\d{2}$/;
const getLastFourCharsOfHexTimestamp = () => Date.now().toString(16);

const BankFundAccountScheme = new Schema({
    account_number: { type: String, required: true, unique: true, default: getLastFourCharsOfHexTimestamp },
    cash_capital: {
        type: String, required: true, validate: {
            validator: (v) => {
                return SUM_REGEX.test(v);
            },
            message: props => `${props.value} invalid value`
        },
    },
    currency: {type: String, default: 'BYN', required: true},

})

module.exports = model('BankFundAccount', BankFundAccountScheme)