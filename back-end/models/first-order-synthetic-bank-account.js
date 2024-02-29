const { Schema, model } = require('mongoose');

const SUM_REGEX = /^\d{1,3}(\.\d{3})*,\d{2}$/;

const FirstOrderSyntheticBankAccountScheme = new Schema({
    fund_account: { type: Schema.Types.ObjectId, ref: "BankFundAccount", required: true },
    account_number: { type: String, required: true, unique: true }, //3 цифры
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
    second_order_synthetic_bank_accounts: [
        { type: Schema.Types.ObjectId, ref: "SecondOrderSyntheticBankAccount"},
    ],
    second_order_synthetic_bank_percent_accounts: [
        { type: Schema.Types.ObjectId, ref: "SecondOrderSyntheticBankPercentAccount"},
    ],
})

module.exports = model('FirstOrderSyntheticBankAccount', FirstOrderSyntheticBankAccountScheme);