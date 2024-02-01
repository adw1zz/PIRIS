import { createSlice } from "@reduxjs/toolkit";
import { newClient, getClients, deleteClients, updateClient } from '../../services/clients-service';

export const clientsSlice = createSlice({
    name: 'clientsData',
    initialState: {
        pagination: {
            limit: 10,
            page: 1,
            total_count: 0
        },
        clients: [],
        deleted: [],
        updated: {},
        added: {},
        status: null,
        error: null,
        loading: false,
    },
    reducers: {
        updatePagination: (state, action) => {
            state.pagination = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            //getClients
            .addCase(getClients.pending, (state) => {
                state.loading = true;
            })
            .addCase(getClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients = action.payload.data.clients;
                state.pagination = action.payload.data.pagination;
                state.status = action.payload.status;
            })
            .addCase(getClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            //newClient
            .addCase(newClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(newClient.fulfilled, (state, action) => {
                state.loading = false;
                state.clients.added = action.payload.data.new_client;
            })
            .addCase(newClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            //deleteClients
            .addCase(deleteClients.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteClients.fulfilled, (state, action) => {
                state.loading = false;
                state.clients.deleted = action.payload.data.deleted_clients;
            })
            .addCase(deleteClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            //updateClient
            .addCase(updateClient.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateClient.fulfilled, (state, action) => {
                state.loading = false;
                state.clients.updated = action.payload.data.updated_client;
            })
            .addCase(updateClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
    }
})

export const { updatePagination } = clientsSlice.actions;