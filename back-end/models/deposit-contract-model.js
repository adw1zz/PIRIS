const { Schema, model } = require('mongoose');

const REGEX = {
    FCs: /^[а-яА-ЯёЁ]+$/,
    passport_number: /^[A-Z]{2}\d{7}$/,
    passport_id_number: /^[A-Z0-9]{14}$/,
    money: /^\d{1,3}(\.\d{3})*,\d{2}$/
}

const DepositContractScheme = new Schema({
    contract_number: {type: String, required: true},
    type: { type: String, default: "Депозитный", required: true },
    source: { type: Schema.Types.ObjectId, ref: "DopositLine", required: true },
    deposit_interest: {
        type: Number,
        required: true,
        min: [1, 'Min value 1'],
        max: [13, 'Max value 13']
    },
    deposit_amount: {
        type: String, required: true, validate: {
            validator: (v) => {
                return REGEX.money.test(v);
            },
            message: props => `${props.value} invalid value`
        },
    },
    full_name: {type: String, required: true},
    birtdate: { type: Date, required: true },
    passport_data: {
        passport_number: {
            type: String, required: true, unique: true, validate: {
                validator: (v) => {
                    return REGEX.passport_number.test(v);
                },
                message: props => `${props.value} invalid value`
            }
        },
        passport_id_number: {
            type: String, required: true, unique: true, validate: {
                validator: (v) => {
                    return REGEX.passport_id_number.test(v);
                },
                message: props => `${props.value} invalid value`
            }
        },
    }
})

module.exports = model('DepositContract', DepositContractScheme);