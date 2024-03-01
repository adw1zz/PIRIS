const { Schema, model } = require('mongoose');
const { DEPOSIT_REGEX } = require('../../consts/deposit');

const SecondOrderSyntheticBankAccountScheme = new Schema({
    account_number: {
        type: String, required: true, unique: true, validate: {
            validator: (v) => {
                return DEPOSIT_REGEX.second_order_synthetic_bank_account_number.test(v);
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
    deposit_line: { type: Schema.Types.ObjectId, ref: "DopositLine", required: true },
    activity: { type: String, default: 'актив.', required: true },
    individual_analytical_accounts: [
        { type: Schema.Types.ObjectId, ref: "IndividualAnalyticalAccount" },
    ]
})

module.exports = model('SecondOrderSyntheticBankAccount', SecondOrderSyntheticBankAccountScheme)