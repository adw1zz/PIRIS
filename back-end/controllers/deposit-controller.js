const ApiError = require('../exceptions/api-error');
const { validationResult } = require('express-validator');
const depositService = require('../services/deposit/deposit-service');

class DepositController {

    async createDepositContract(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Некорректные данные', errors.array()))
            }
            const { data, contract_code } = req.body;
            const newDepositContract = await depositService.createDepositContract(data, contract_code);
            return res.json({
                data: {
                    new_contract: {
                        ...newDepositContract
                    }
                }
            })
        } catch (e) {
            next(e);
        }
    }

    async cashIn(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Некорректные данные', errors.array()))
            }
            const { data } = req.body;
            const updatedAcount = await depositService.cashIn(data);
            return res.json({
                data: {
                    client_account: {
                        ...updatedAcount,
                    }
                }
            })
        } catch (e) {
            next(e);
        }
    }

    async cashOut(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Некорректные данные', errors.array()))
            }
            const { data } = req.body;
            const updatedAcount = await depositService.cashOut(data);
            return res.json({
                data: {
                    client_account: {
                        ...updatedAcount,
                    }
                }
            })
        } catch (e) {
            next(e);
        }
    }

    async percent(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Некорректные данные', errors.array()))
            }
            const { data } = req.body;
            await depositService.percent();
            return res.json({ message: 'Success' });
        } catch (e) {
            next(e);
        }
    }

    async closeBankDay(req, res, next) {
        try {
            await depositService.closeBankDay();
            return res.json({ message: 'Success' });
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new DepositController();