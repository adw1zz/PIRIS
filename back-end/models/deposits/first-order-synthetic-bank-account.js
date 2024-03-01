const { Schema, model } = require('mongoose');
const { DEPOSIT_REGEX } = require('../../consts/deposit');

const FirstOrderSyntheticBankAccountScheme = new Schema({
    fund_account: { type: Schema.Types.ObjectId, ref: "BankFundAccount", required: true },
    account_number: {
        type: String, required: true, unique: true, validate: {
            validator: (v) => {
                return DEPOSIT_REGEX.first_order_synthetic_bank_account_number.test(v);
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
    second_order_synthetic_bank_accounts: [
        { type: Schema.Types.ObjectId, ref: "SecondOrderSyntheticBankAccount" },
    ],
    second_order_synthetic_bank_percent_accounts: [
        { type: Schema.Types.ObjectId, ref: "SecondOrderSyntheticBankPercentAccount" },
    ],
})

module.exports = model('FirstOrderSyntheticBankAccount', FirstOrderSyntheticBankAccountScheme);