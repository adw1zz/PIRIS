const { Schema, model } = require('mongoose');

const SUM_REGEX = /^\d{1,3}(\.\d{3})*,\d{2}$/;

const SecondOrderSyntheticBankAccountScheme = new Schema({
    account_number: { type: String, required: true, unique: true }, //5 цифры (3 от первого порядка плюс 2 новые)
    sum: { //общая от аналитики
        type: String, required: true, validate: {
            validator: (v) => {
                return SUM_REGEX.test(v);
            },
            message: props => `${props.value} invalid value`
        },
        default: "0.000,00"
    },
    currency: { type: String, default: 'BYN', required: true },
    deposit_line: { type: Schema.Types.ObjectId, ref: "DopositLine", required: true },
    activity: {type: String, default: 'актив.', required: true},
    individual_analytical_accounts: [
        { type: Schema.Types.ObjectId, ref: "IndividualAnalyticalAccount"},
    ]
})

module.exports = model('SecondOrderSyntheticBankAccount', SecondOrderSyntheticBankAccountScheme)