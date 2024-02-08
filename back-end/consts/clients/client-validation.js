const CLIENT_ENUMS = {
    gender: ['Мужчина', 'Женщина'],
    cities: ['Минск', 'Гродно', 'Брест', 'Витебск', 'Гомель'],
    marital_status: ['Женат', 'Замужем', 'Не женат', 'Не замужем'],
    citizenship: ['РБ', 'РФ'],
}

const CLIENT_REGEX = {
    FCs: /^[а-яА-ЯёЁ]+$/,
    home_phone: /^\d{7}$/,
    text_address: /^[а-яА-ЯёЁ0-9\s\.\,\-]+$/,
    mob_phone: /^\+375\d{9}$/,
    money: /^\d{1,3}(\.\d{3})*,\d{2}$/,
    job: /^[а-яА-ЯёЁa-zA-Z\s\.\-\"']+$/,
}

const CLIENT_VALIDATION_ERR_MSG = {
    type: 'Значение не является ',
    empty: 'Значение не должно быть пустым',
    name: "Имя должно быть написано кириллицей без каких-либо спец. симоволов",
    surname: "Фамилия должна быть написана кириллицей без каких-либо спец. симоволов",
    patronymic: "Отчество должно быть написано кириллицей без каких-либо спец. симоволов",
    birthdate: "Невалидная дата рождения",
    gender: `Такого значения нет в списке ${CLIENT_ENUMS.gender}`,
    text_address: "Допустимы символы 'ru' алфавита, ' ', '.', ',', '-' цифры",
    home_phone: "Невалидный дом. телефон",
    mob_phone: "Должен быть действительным номером мобильного телефона в Беларуси",
    email: "Почта должны быть валидной",
    workplace: "Допустимы символы ru/en алфавит, ' ', '.', ',', '-', кавычки",
    post: "Допустимы символы ru/en алфавит, ' ', '.', ',', '-', кавычки",
    cities: `Такого значения нет в списке ${CLIENT_ENUMS.cities}`,
    marital_status: `Такого значения нет в списке ${CLIENT_ENUMS.marital_status}`,
    citizenship: `Такого значения нет в списке ${CLIENT_ENUMS.citizenship}`,
    retiree: "Поле должно быть 'true' или 'false'",
    monthly_cash_income: "Не валидное значение денежной суммы",
    liable: "Поле должно быть 'true' или 'false'",
}

module.exports = {CLIENT_VALIDATION_ERR_MSG, CLIENT_ENUMS, CLIENT_REGEX};