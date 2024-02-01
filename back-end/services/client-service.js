const clientModel = require('../models/client-model');
const ClientDTO = require('../dtos/client-dto');
const getDTOs = require('../utils/get-dtos');

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
        return clientsArrayObject;
    }

    async post(data) {
        const client = await clientModel.create({ ...data });
        return new ClientDTO(client);
    }

    async put(data, id) {
        const updatedClient = await clientModel.findByIdAndUpdate(id, data.new_client, { new: true });
        return new ClientDTO(updatedClient);
    }

    async delete(ids) {
        const deletedClients = await clientModel.deleteMany({ _id: { $in: ids } });
        const deletedClientsDtos = getDTOs(ClientDTO, deletedClients);
        return deletedClientsDtos;
    }
}


module.exports = new ClientService();