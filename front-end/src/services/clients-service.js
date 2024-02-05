import { createAsyncThunk } from "@reduxjs/toolkit";
const url = `http://localhost:5000/api/clients`;

export const newClient = createAsyncThunk('clients/post', async (formData, thunkAPI) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: { ...formData } })
        }
        const response = await fetch(`${url}/post`, options);
        const status = response.status;
        const body = await response.json();
        return { data: body.data, status }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})

export const updateClient = createAsyncThunk('clients/put', async (formData, thunkAPI) => {
    try {
        const { id, ...rawData } = formData;
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: formData.id, data: rawData })
        }
        const response = await fetch(`${url}/put`, options);
        const status = response.status;
        const body = await response.json();
        return { data: body.data, status }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})

export const getClients = createAsyncThunk('clients/get', async (pagination, thunkAPI) => {
    try {
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(`${url}/get?page=${pagination.page}&limit=${pagination.limit}`, options);
        const status = response.status;
        const body = await response.json();
        return { data: body.data, status }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})


export const deleteClients = createAsyncThunk('clients/delete', async (ids, thunkAPI) => {
    try {
        const options = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                data: {
                    ids: ids
                }
            })
        }
        const response = await fetch(`${url}/delete`, options);
        const status = response.status;
        const body = await response.json();
        return { data: body.data, status }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})