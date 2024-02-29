const { Schema, model } = require('mongoose');

const IBAN = /^BY\d{2}ZEPT\d{4}[A-Z0-9]{16}$/;
const SUM_REGEX = /^\d{1,3}(\.\d{3})*,\d{2}$/;

const IndividualAnalyticalAccountScheme = new Schema({
    iban: {
        type: String, required: true, unique: true, validate: {
            validator: (v) => {
                return IBAN.test(v);
            },
            message: props => `${props.value} invalid value`
        },
    },
    contract_number: {type: String, required: true},
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
    activity: {type: String, default: 'пассив.', required: true},
})

module.exports = model('IndividualAnalyticalAccount', IndividualAnalyticalAccountScheme);