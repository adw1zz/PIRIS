const { depositLineModel, depositContractModel, individualAnalyticalAccountModel, firstOrderSyntheticBankAccountModel, bankFundAccountModel, depositTransactionsModel, secondOrderSyntheticBankAccountModel, secondOrderSyntheticBankPercentAccountModel } = require('../../models/deposits/index');
const clientModel = require('../../models/clients/client-model');
const ApiError = require('../../exceptions/api-error');
const DepositContractDto = require("../../dtos/deposit/deposit-contract-dto");
const CurrencyConverter = require('../../utils/currency-converter');
const IndividualAnalyticalAccountDto = require('../../dtos/deposit/analytical-account-of-an-individual');
const { DEPOSIT_ENUMS } = require('../../consts/deposit/index');

class DepositService {
    async createDepositContract(data, contract_code) {
        const depositLine = await depositLineModel.findOne({ contract_code });
        if (!depositLine) {
            throw ApiError.BadRequest(`This deposit line not exists in database`, [{ contract_code }]);
        }
        const client = await clientModel.findOne({
            name: data.full_name.name,
            surname: data.full_name.surname,
            patronymic: data.full_name.patronymic,
            passport_number: data.passport_data.passport_number,
            passport_id_number: data.passport_data.passport_id_number,
            birthdate: data.birthdate
        });
        if (!client) {
            throw ApiError.BadRequest(`This client exists in database`, [{ full_name: { ...data.full_name }, passport_data: { ...data.passport_data } }]);
        }
        let depositContract = await depositContractModel.findOne({
            passport_data: { ...data.passport_data },
            full_name: { ...data.full_name }
        })
        if (depositContract) {
            throw ApiError.BadRequest(`This deposit contract exists in database`, [{ full_name: { ...data.full_name }, passport_data: { ...data.passport_data } }]);
        }
        const depositAmountNumeric = CurrencyConverter.stringToNumber(data.deposit_amount);
        const depositLineMinSumNumeric = CurrencyConverter.stringToNumber(depositLine.min_sum);
        const depositLineMaxSumNumeric = CurrencyConverter.stringToNumber(depositLine.max_sum);
        if (depositAmountNumeric < depositLineMinSumNumeric || depositAmountNumeric > depositLineMaxSumNumeric) {
            throw ApiError.BadRequest(`The deposit amount out of borders`, [{ deposit_amount: { ...data.deposit_amount }, min_sum: depositLine.min_sum, max_sum: depositLine.max_sum }]);
        }
        const depositContractCount = await depositContractModel.countDocuments();
        const contract_number = contract_code + (depositContractCount + 1).toString().padStart(10, '0');
        let individualAnalyticalAccount = await individualAnalyticalAccountModel.findOne({ contract_number: contract_number });
        if (individualAnalyticalAccount) {
            throw ApiError.BadRequest(`IndividualAnalyticalAccount exist`, [{ contract_number: contract_number }]);
        }
        depositContract = await depositContractModel.create({ ...data, contract_number: contract_number, source: depositLine.id });
        individualAnalyticalAccount = await individualAnalyticalAccountModel.create(
            {
                contract_number: depositContract.contract_number,
                iban: `BY01ZEPT0001${depositContract.contract_number}`
            }
        )
        const secondOrderSyntheticBankAccount = await secondOrderSyntheticBankAccountModel.findOne({ deposit_line: depositLine.id })
        secondOrderSyntheticBankAccount.individual_analytical_accounts.push(individualAnalyticalAccount.id);
        await secondOrderSyntheticBankAccount.save();
        const account_number = secondOrderSyntheticBankAccount.account_number + (depositContractCount + 1).toString().padStart(10, '0');
        await secondOrderSyntheticBankPercentAccountModel.create({
            client_iban: individualAnalyticalAccount.iban,
            account_number: account_number
        })
        return new DepositContractDto(depositContract);
    }

    async cashIn(data) {
        const individualAnalyticalAccount = await individualAnalyticalAccountModel.findOne({ iban: data.iban });
        if (!individualAnalyticalAccount) {
            throw ApiError.BadRequest(`IndividualAnalyticalAccount not exist`, [{ iban: { ...data.iban } }]);
        }
        const prevSumNumeric = CurrencyConverter.stringToNumber(individualAnalyticalAccount.sum);
        const newSumNumeric = CurrencyConverter.stringToNumber(data.sum);
        const updatedSum = CurrencyConverter.numberToString(prevSumNumeric + newSumNumeric);
        individualAnalyticalAccount.sum = updatedSum;
        await individualAnalyticalAccount.save();
        const individualAnalyticalAccountDto = new IndividualAnalyticalAccountDto(individualAnalyticalAccount);
        await depositTransactionsModel.create({
            type: "Cash In",
            target_iban: data.iban,
            sum: data.sum,
        })
        return individualAnalyticalAccountDto;
    }

    async cashOut(data) {
        const individualAnalyticalAccount = await individualAnalyticalAccountModel.findOne({ iban: data.iban });
        if (!individualAnalyticalAccount) {
            throw ApiError.BadRequest(`IndividualAnalyticalAccount not exist`, [{ iban: { ...data.iban } }]);
        }
        const cashOutSum = individualAnalyticalAccount.sum;
        individualAnalyticalAccount.sum = "0.000,00";
        await individualAnalyticalAccount.save();
        const individualAnalyticalAccountDto = new IndividualAnalyticalAccountDto(individualAnalyticalAccount);
        await depositTransactionsModel.create({
            type: "Cash Out",
            target_iban: data.iban,
            sum: cashOutSum,
        })
        return individualAnalyticalAccountDto;
    }

    async percent(data) {
        const individualAnalyticalAccount = await individualAnalyticalAccountModel.findOne({ iban: data.iban });
        if (!individualAnalyticalAccount) {
            throw ApiError.BadRequest(`IndividualAnalyticalAccount not exist`, [{ iban: { ...data.iban } }]);
        }
        await depositTransactionsModel.create({
            type: "Percent",
            target_iban: data.iban
        })
        return;
    }

    async closeBankDay() {
        const cashInTransactions = await depositTransactionsModel.find({ type: "Cash In" });
        if (cashInTransactions.length > 0) {
            const secondOrderSyntheticBankAccount = await secondOrderSyntheticBankAccountModel.findOne({ account_number: "00101" });
            let secondOrderSyntheticBankAccountTotalSum = CurrencyConverter.stringToNumber(secondOrderSyntheticBankAccount.sum);
            const indAccounts = await individualAnalyticalAccountModel.find({ '_id': { $in: secondOrderSyntheticBankAccount.individual_analytical_accounts } });
            for (let i = 0; i < indAccounts.length; i++) {
                secondOrderSyntheticBankAccountTotalSum += CurrencyConverter.stringToNumber(indAccounts[i].sum);
            }
            secondOrderSyntheticBankAccount.sum = CurrencyConverter.numberToString(totalSum);
            await secondOrderSyntheticBankAccount.save();
            const firstOrderSyntheticBankAccount = await firstOrderSyntheticBankAccountModel.findOne({ account_number: "001" });
            const secAccounts = await secondOrderSyntheticBankAccountModel.find({ '_id': { $in: firstOrderSyntheticBankAccount.second_order_synthetic_bank_accounts } });
            let firstOrderSyntheticBankAccountTotalSum = CurrencyConverter.stringToNumber(firstOrderSyntheticBankAccount.sum);
            for (let i = 0; i < secAccounts.length; i++) {
                firstOrderSyntheticBankAccountTotalSum += CurrencyConverter.stringToNumber(secAccounts[i].sum);
            }
            firstOrderSyntheticBankAccount.sum = CurrencyConverter.numberToString(firstOrderSyntheticBankAccountTotalSum);
            await firstOrderSyntheticBankAccount.save();
            const bankFundAccount = await bankFundAccountModel.findById('65e08c077063302f157fc985');
            const prevSum = CurrencyConverter.stringToNumber(bankFundAccount.cash_capital);
            bankFundAccount.cash_capital = CurrencyConverter.numberToString(firstOrderSyntheticBankAccountTotalSum + prevSum);
            await bankFundAccount.save();
        }
        const percentTransactions = await depositTransactionsModel.find({ type: "Percent" });
        if (percentTransactions.length > 0) {
            const ibans = percentTransactions.map((transaction) => {
                return transaction.target_iban;
            })
            const percentAccounts = await secondOrderSyntheticBankPercentAccountModel.find({ 'client_iban': { $in: ibans } });
            for (let i = 0; i < percentAccounts.length; i++) {
                const prevSum = CurrencyConverter.stringToNumber(percentAccounts[i].sum);
                const clientAccount = await individualAnalyticalAccountModel.findOne({ iban: percentAccounts[i].client_iban });
                const clientSum = CurrencyConverter.stringToNumber(clientAccount.sum);
                const depositContract = await depositContractModel.findOne({ contract_number: clientAccount.contract_number });
                const newSum = prevSum + ((depositContract.deposit_interest / 100) * (clientSum + prevSum));
                percentAccounts[i].sum = CurrencyConverter.numberToString(newSum);
                percentAccounts[i].save();
            }
            const firstOrderSyntheticBankAccount = await firstOrderSyntheticBankAccountModel.findOne({ account_number: "001" });
            let firstOrderSyntheticBankAccountTotalSum = CurrencyConverter.stringToNumber(firstOrderSyntheticBankAccount.sum);
            const secPerAccounts = await secondOrderSyntheticBankPercentAccountModel.find({ '_id': { $in: firstOrderSyntheticBankAccount.second_order_synthetic_bank_percent_accounts } });
            for (let i = 0; i < secPerAccounts.length; i++) {
                firstOrderSyntheticBankAccountTotalSum += CurrencyConverter.stringToNumber(secPerAccounts[i].sum);
            }
            firstOrderSyntheticBankAccount.sum = CurrencyConverter.numberToString(firstOrderSyntheticBankAccountTotalSum);
            await firstOrderSyntheticBankAccount.save();
            const bankFundAccount = await bankFundAccountModel.findById('65e08c077063302f157fc985');
            const prevSum = CurrencyConverter.stringToNumber(bankFundAccount.cash_capital);
            bankFundAccount.cash_capital = CurrencyConverter.numberToString(prevSum + firstOrderSyntheticBankAccountTotalSum);
            bankFundAccount.save();
        }
        const cashOutTransactions = await depositTransactionsModel.find({ type: "Cash Out" });
        if (cashOutTransactions.length > 0) {
            const secondOrderSyntheticBankAccount = await secondOrderSyntheticBankAccountModel.findOne({ account_number: "00101" });
            let secondOrderSyntheticBankAccountTotalSum = CurrencyConverter.stringToNumber(secondOrderSyntheticBankAccount.sum);
            const indAccounts = await individualAnalyticalAccountModel.find({ '_id': { $in: secondOrderSyntheticBankAccount.individual_analytical_accounts } });
            for (let i = 0; i < indAccounts.length; i++) {
                secondOrderSyntheticBankAccountTotalSum -= CurrencyConverter.stringToNumber(indAccounts[i].sum);
            }
            secondOrderSyntheticBankAccount.sum = CurrencyConverter.numberToString(totalSum);
            await secondOrderSyntheticBankAccount.save();
            const firstOrderSyntheticBankAccount = await firstOrderSyntheticBankAccountModel.findOne({ account_number: "001" });
            const secAccounts = await secondOrderSyntheticBankAccountModel.find({ '_id': { $in: firstOrderSyntheticBankAccount.second_order_synthetic_bank_accounts } });
            let firstOrderSyntheticBankAccountTotalSum = CurrencyConverter.stringToNumber(firstOrderSyntheticBankAccount.sum);
            for (let i = 0; i < secAccounts.length; i++) {
                firstOrderSyntheticBankAccountTotalSum -= CurrencyConverter.stringToNumber(secAccounts[i].sum);
            }
            firstOrderSyntheticBankAccount.sum = CurrencyConverter.numberToString(firstOrderSyntheticBankAccountTotalSum);
            await firstOrderSyntheticBankAccount.save();
            const bankFundAccount = await bankFundAccountModel.findById('65e08c077063302f157fc985');
            const prevSum = CurrencyConverter.stringToNumber(bankFundAccount.cash_capital);
            bankFundAccount.cash_capital = CurrencyConverter.numberToString(prevSum - firstOrderSyntheticBankAccountTotalSum);
            await bankFundAccount.save();
            const ibans = cashInTransactions.map((doc) => {
                return doc.target_iban;
            })
            const clientAccounts = await individualAnalyticalAccountModel.find({ 'iban': { $in: ibans } });
            const clientAccountsIds = clientAccounts.map((account) => {
                return account.id
            });
            for (let i = 0; i < clientAccounts.length; i++) {
                await depositContractModel.findOneAndDelete({ contract_number: clientAccounts[i].contract_number });
            }
            const updatedList = secondOrderSyntheticBankAccount.individual_analytical_accounts.filter(val => !clientAccountsIds.includes(val));
            secondOrderSyntheticBankAccount.individual_analytical_accounts = updatedList;
            secondOrderSyntheticBankAccount.save();
            await individualAnalyticalAccountModel.deleteMany({ 'iban': { $in: ibans } });
            await secondOrderSyntheticBankPercentAccountModel.deleteMany({ 'client_iban': { $in: ibans } });
        }

        await depositTransactionsModel.deleteMany();
        return;
    }

}

module.exports = new DepositService();