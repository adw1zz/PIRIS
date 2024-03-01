const { Schema, model } = require('mongoose');
const { DEPOSIT_REGEX } = require('../../consts/deposit');

const DepositContractScheme = new Schema({
    contract_number: {
        type: String, required: true, unique: false, validate: {
            validator: (v) => {
                return DEPOSIT_REGEX.deposit_contract_number.test(v);
            },
            message: props => `${props.value} invalid value`
        },
    },
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
                return DEPOSIT_REGEX.money.test(v);
            },
            message: props => `${props.value} invalid value`
        },
    },
    full_name: {
        name: {
            type: String, required: true, validate: {
                validator: (v) => {
                    return DEPOSIT_REGEX.full_name.test(v);
                }, message: props => `${props.value} invalid value`
            }
        },
        surname: {
            type: String, required: true, validate: {
                validator: (v) => {
                    return DEPOSIT_REGEX.full_name.test(v);
                }, message: props => `${props.value} invalid value`
            }
        },
        patronymic: {
            type: String, required: true, validate: {
                validator: (v) => {
                    return DEPOSIT_REGEX.full_name.test(v);
                }, message: props => `${props.value} invalid value`
            }
        },
    },
    birthdate: { type: Date, required: true },
    passport_data: {
        passport_number: {
            type: String, required: true, unique: true, validate: {
                validator: (v) => {
                    return DEPOSIT_REGEX.passport_number.test(v);
                },
                message: props => `${props.value} invalid value`
            }
        },
        passport_id_number: {
            type: String, required: true, unique: true, validate: {
                validator: (v) => {
                    return DEPOSIT_REGEX.passport_id_number.test(v);
                },
                message: props => `${props.value} invalid value`
            }
        },
    }
})

module.exports = model('DepositContract', DepositContractScheme);