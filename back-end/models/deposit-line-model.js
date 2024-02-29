const { Schema, model } = require('mongoose');

const getLastFourCharsOfHexTimestamp = () => Date.now().toString(16).slice(-6);
const getDefaultEndDate = () => Date.now() + 2*365*24*60*60*1000;
const SUM_REGEX = /^\d{1,3}(\.\d{3})*,\d{2}$/;

const DepositLineScheme = new Schema({
    type: {type: String, enum: ["Безотзывной"], default: "Безотзывной", required: true},
    contract_code: { type: String, length: 4, required: true, default: getLastFourCharsOfHexTimestamp, unique: true },
    currency: { type: String, default: "BYN", required: true},
    start_date: {type: Date, default: Date.now, required: true},
    end_date: {type: Date, default: getDefaultEndDate, required: true},
    contract_term: {type: Number, default: 365*24*60*60*1000, required: true},
    min_sum: {
        type: String, required: true, validate: {
            validator: (v) => {
                return SUM_REGEX.test(v);
            },
            message: props => `${props.value} invalid value`
        },
        default: "1.000,00"
    },
    max_sum: {
        type: String, required: true, validate: {
            validator: (v) => {
                return SUM_REGEX.test(v);
            },
            message: props => `${props.value} invalid value`
        },
        default: "10.000,00"
    },
})

module.exports = model('DopositLine', DepositLineScheme);