const DEPOSIT_ENUMS = {
    deposit_transactions_type: ["Cash In", "Cash Out"],
    deposit_line_type: ["Безотзывной"],
}

const DEPOSIT_REGEX = {
    iban: /^BY\d{2}ZEPT\d{4}[A-Z0-9]{16}$/,
    money: /^\d{1,3}(\.\d{3})*,\d{2}$/,
    passport_number: /^[A-Z]{2}\d{7}$/,
    passport_id_number: /^[A-Z0-9]{14}$/,
    full_name: /^[а-яА-ЯёЁ]+$/,
    deposit_contract_number: /^[a-zA-Z0-9]{6}[0-9]{6}$/,
    deposit_line_contract_code: /^[a-zA-Z0-9]{6}$/,
    first_order_synthetic_bank_account_number: /^\d{3}$/,
    second_order_synthetic_bank_account_number: /^\d{5}$/,
    second_order_synthetic_bank_precent_account_number: /^\d{7}$/
}

const DEPOSIT_VALIDATION_ERR_MSG = {
    type: 'Значение не является ',
    empty: 'Значение не должно быть пустым',
    invalid: 'Поле невалидное по маске',
    enum: 'Такого значения нет в списке ',
}

module.exports = { DEPOSIT_ENUMS, DEPOSIT_REGEX, DEPOSIT_VALIDATION_ERR_MSG };