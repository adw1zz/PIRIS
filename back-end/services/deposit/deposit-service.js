const { depositLineModel, depositContractModel } = require('../../models/deposits/index');
const clientModel = require('../../models/clients/client-model');
const ApiError = require('../../exceptions/api-error');
const DepositContractDto = require("../../dtos/deposit/deposit-contract-dto");

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
        //проверить deposit amount
        //создать анал. счет
        //создать синт. второго порядка процентный
        const depositContractCount = await depositContractModel.countDocuments();
        const contract_number = contract_code + (depositContractCount + 1).toString().padStart(6, '0');
        depositContract = await depositContractModel.create({ ...data, contract_number: contract_number, source: depositLine.id });
        return new DepositContractDto(depositContract);
    }
}

module.exports = new DepositService();