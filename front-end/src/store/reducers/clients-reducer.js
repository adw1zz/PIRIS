import { createSlice } from "@reduxjs/toolkit";
import { newClient, getClients, deleteClients, updateClient } from '../../services/clients-service';

export const clientsSlice = createSlice({
    name: 'clientsData',
    initialState: {
        toDelete: [],
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
        badReq: null,
        loading: false,
    },
    reducers: {
        updatePagination: (state, action) => {
            state.pagination = action.payload;
        },
        updateToDeleteList: (state, action) => {
            state.toDelete = action.payload;
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
                state.status = action.payload.status;
                if (action.payload.status === 400) {
                    state.error = action.payload.data;
                } else {
                    state.clients = action.payload.data.clients;
                    state.pagination = action.payload.data.pagination;
                }
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
                state.status = action.payload.status;
                if (action.payload.status === 400) {
                    state.error = action.payload.data;
                } 
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
                state.status = action.payload.status;
                if (action.payload.status === 400) {
                    state.error = action.payload.data;
                } 
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
                state.status = action.payload.status;
                if (action.payload.status === 400) {
                    state.error = action.payload.data;
                } 
            })
            .addCase(updateClient.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
    }
})

export const { updatePagination, updateToDeleteList } = clientsSlice.actions;