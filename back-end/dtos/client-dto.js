module.exports = class ClientDto {
    id;
    surname;
    name;
    patronymic
    birthdate
    gender
    city_of_actual_residence
    address_of_the_actual_residence
    home_phone
    mob_phone
    email
    workplace
    post
    city_of_residence
    address_of_residence
    marital_status
    citizenship
    retiree
    monthly_cash_income
    liable

    constructor(model) {
        const date = new Date(model.birthdate);
        this.birthdate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        this.id = model.id;
        this.name = model.name;
        this.surname = model.surname;
        this.patronymic = model.patronymic;
        this.gender = model.gender;
        this.city_of_actual_residence = model.city_of_actual_residence;
        this.address_of_the_actual_residence = model.address_of_the_actual_residence;
        this.home_phone = model.home_phone;
        this.mob_phone = model.mob_phone;
        this.email = model.email;
        this.workplace = model.workplace;
        this.post = model.post;
        this.city_of_residence = model.city_of_residence;
        this.address_of_residence = model.address_of_residence;
        this.marital_status = model.marital_status;
        this.citizenship = model.citizenship;
        this.retiree = model.retiree;
        this.monthly_cash_income = model.monthly_cash_income;
        this.liable = model.liable;
    }
}