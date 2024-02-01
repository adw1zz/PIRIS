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
        const body = await response.json();
        return { data: body.data }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})

export const updateClient = createAsyncThunk('clients/put', async (formData, thunkAPI) => {
    try {
        const options = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ data: { ...formData } })
        }
        const response = await fetch(`${url}/put`, options);
        const body = await response.json();
        return { data: body.data }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})

export const getClients = createAsyncThunk('clients/get', async (pagination, thunkAPI) => {
    try {
        console.log(url);
        const options = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
        const response = await fetch(`${url}/get?page=${pagination.page}&limit=${pagination.limit}`, options);
        const body = await response.json();
        return { data: body.data }
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
        const body = await response.json();
        return { data: body.data }
    } catch (error) {
        return thunkAPI.rejectWithValue({ error: error.message })
    }
})