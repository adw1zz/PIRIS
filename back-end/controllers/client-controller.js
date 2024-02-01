const ApiError = require('../exceptions/api-error');
const clientSercvice = require('../services/client-service');
const { validationResult } = require('express-validator');

class ClientController {
    async get(req, res, next) {
        try {
            const { page, limit } = req.query;
            const clientsArrayObject = await clientSercvice.get(page, limit);
            return res.json({
                data: {
                    ...clientsArrayObject
                }
            })
        } catch (e) {
            next(e)
        }
    }

    async post(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Некорректные данные', errors.array()))
            }
            const { data } = req.body;
            const clientData = await clientSercvice.post(data);
            return res.json({
                data: {
                    new_client: {
                        ...clientData
                    }
                }
            })
        } catch (e) {
            next(e)
        }
    }

    async put(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Некорректные данные', errors.array()))
            }
            const { data } = req.body;
            const updatedClient = await clientSercvice.put(data);
            return res.json({
                data: {
                    updated_client: {
                        ...updatedClient
                    }
                }
            })
        } catch (e) {
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            const { data } = req.body;
            const deletedClients = await clientSercvice.delete(data.ids);
            return res.json({
                data: {
                    deleted_clients: deletedClients
                }
            })
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new ClientController();