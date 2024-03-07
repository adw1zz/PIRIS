class CurrencyConverter {
    static stringToNumber(str = "0.000,00") {
        const numberString = str.replace(/\./g, '').replace(',', '.');
        return parseFloat(numberString);
    }

    static numberToString(num = 0.0) {
        const numberString = num.toFixed(2);
        const parts = numberString.split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return parts.join(",");
    }
}

module.exports = CurrencyConverter;