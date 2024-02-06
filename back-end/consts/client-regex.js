const CLIENT_REGEX = {
    FCs: /^[а-яА-ЯёЁ]+$/,
    home_phone: /^\d{7}$/,
    text_address: /^[а-яА-ЯёЁ\s\.]+$/,
    mob_phone: /^\+375\d{9}$/,
    money: /^\d{1,3}(\.\d{3})*,\d{2}$/,
    job: /^[а-яА-ЯёЁa-zA-Z\s\.\"']+$/,
}

module.exports = CLIENT_REGEX;