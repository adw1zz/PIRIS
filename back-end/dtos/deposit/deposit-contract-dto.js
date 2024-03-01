module.exports = class DepositContractDto {
    id;
    contract_number;
    type;
    source;
    deposit_interest;
    deposit_amount;
    full_name;
    birtdate;
    passport_data;

    constructor(model) {
        const date = new Date(model.birthdate);
        this.birthdate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        this.id = model.id;
        this.contract_number = model.contract_number;
        this.type = model.type;
        this.source = model.source;
        this.full_name = model.full_name;
        this.passport_data = model.passport_data;
    }
}