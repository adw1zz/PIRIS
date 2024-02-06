export const CLIENT_REGEX_INPUT_PETTERN = {
    FCs: /^[а-яА-ЯёЁ]+$/,
    home_phone: /^\d{7}$/,
    text_address: /^[а-яА-ЯёЁ\s\.]+$/,
    mob_phone: /^\+375\d{9}$/,
    money: /^\d{1,3}(\.\d{3})*,\d{2}$/,
    job: /^[а-яА-ЯёЁa-zA-Z\s\.\"']+$/,
}

export const CLIENT_REGEX_INPUT_PETTERN_TITLE = {
    FCs: "Допустимы символы только 'ru' алфавита",
    home_phone: "Допустима строка из 7-ми цифр",
    text_address: "Допустимы символы 'ru' алфавита, ' ', '.'",
    mob_phone: "Номер должен начинаться с +375, далле цифры",
    money: "Разделитель тысяч - '.', разделитель десятичных - ','",
    job: "Допустимы 'ru' / 'en' алфавиты, символы ' ', '.', кавычки"
}
