module.exports = class IndividualAnalyticalAccountDto {
    id;
    iban;
    contract_number;
    sum;
    currency;

    constructor(model) {
        this.id = model.id;
        this.iban = model.iban;
        this.contract_number = model.contract_number;
        this.sum = model.sum;
        this.currency = model.currency;
    }
}