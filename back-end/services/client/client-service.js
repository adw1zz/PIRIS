const clientModel = require('../../models/clients/client-model');
const ClientDTO = require('../../dtos/client/client-dto');
const getDTOs = require('../../utils/get-dtos');
const ApiError = require('../../exceptions/api-error');

class ClientService {
    async get(page, limit) {
        const clientsArrayObject = {
            pagination: {
                limit: limit,
                page: page,
                total_count: 0,
            },
            clients: []
        };
        clientsArrayObject.pagination.total_count = await clientModel.countDocuments();
        const clients = await clientModel.find().skip((page - 1) * limit).limit(limit);
        clientsArrayObject.clients = getDTOs(ClientDTO, clients);
        clientsArrayObject.clients.sort((a, b) => a.surname.localeCompare(b.surname));
        return clientsArrayObject;
    }

    async post(data) {
        let client = await clientModel.findOne({ ...data });
        if (client) {
            throw ApiError.BadRequest(`This user exists`, [{ ...data }]);
        }
        if (data.email) {
            client = await clientModel.findOne({ email: data.email })
            if (client) {
                throw ApiError.BadRequest(`This email exists in database`, [{ email: data.email }]);
            }
        }
        if (data.mob_phone) {
            client = await clientModel.findOne({ mob_phone: data.mob_phone })
            if (client) {
                throw ApiError.BadRequest(`This mobile phone exists in database`, [{ mob_phone: data.mob_phone }]);
            }
        }
        const newClient = await clientModel.create({ ...data });
        return new ClientDTO(newClient);
    }

    async put(data, client_id) {
        let client = await clientModel.findOne({ ...data });
        if (client && client.id !== client_id) {
            throw ApiError.BadRequest(`This user exists`, [{ ...data }]);
        }
        if (data.email) {
            client = await clientModel.findOne({ email: data.email })
            if (client && client.id !== client_id) {
                throw ApiError.BadRequest(`This email exists in database`, [{ email: data.email }]);
            }
        }
        if (data.mob_phone) {
            client = await clientModel.findOne({ mob_phone: data.mob_phone })
            if (client && client.id !== client_id) {
                throw ApiError.BadRequest(`This mobile phone exists in database`, [{ mob_phone: data.mob_phone }]);
            }
        }
        const updatedClient = await clientModel.findByIdAndUpdate(client_id, {...data}, { new: true });
        return new ClientDTO(updatedClient);
    }

    async delete(ids) {
        const deletedClients = await clientModel.deleteMany({ _id: { $in: ids } });
        const deletedClientsDtos = getDTOs(ClientDTO, deletedClients);
        return deletedClientsDtos;
    }
}


module.exports = new ClientService();