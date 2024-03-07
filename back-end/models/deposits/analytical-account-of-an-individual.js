const { Schema, model } = require('mongoose');
const { DEPOSIT_REGEX } = require('../../consts/deposit');

const IndividualAnalyticalAccountScheme = new Schema({
    iban: {
        type: String, required: true, unique: true, validate: {
            validator: (v) => {
                return DEPOSIT_REGEX.iban.test(v);
            },
            message: props => `${props.value} invalid value`
        },
    },
    contract_number: {
        type: String, required: true, validate: {
            validator: (v) => {
                return DEPOSIT_REGEX.deposit_contract_number.test(v);
            },
            message: props => `${props.value} invalid value`
        }
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
    activity: { type: String, default: 'пассив.', required: true },
})

module.exports = model('IndividualAnalyticalAccount', IndividualAnalyticalAccountScheme);