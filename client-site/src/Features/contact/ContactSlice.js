/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Url from '../../Url';

export const getContacts = createAsyncThunk('contacts/getContact', async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            access_token: localStorage.getItem('access_token'),
        },
    };
    const res = await axios.get(Url.contacts, config);
    return res;
});

export const createContact = createAsyncThunk('contacts/createContact', async (credentials) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            access_token: localStorage.getItem('access_token'),
        },
    };

    const res = axios.post(Url.create, credentials, config);
    return res;
});

export const updateContact = createAsyncThunk('contacts/updateContact', async (credentials) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            access_token: localStorage.getItem('access_token'),
        },
    };
    const res = axios.post(Url.update, credentials, config);
    return res;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (id) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            access_token: localStorage.getItem('access_token'),
        },
    };
    const res = await axios.get(Url.delete + id, config);
    return res;
});

const ContactSlice = createSlice({
    name: 'contacts',
    initialState: {
        isLoading: false,
        isError: false,
        user: null,
        contacts: [],
        isSuccess: false,
        errors: null,
        message: null,
    },
    extraReducers: (builder) => {
        builder.addCase(getContacts.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getContacts.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.isLoading = false;
                state.isError = false;
                state.user = action.payload.data.user;
                state.contacts = action.payload.data.contacts;
            } else {
                state.isLoading = false;
                state.isError = true;
                state.user = null;
                state.contacts = null;
            }
        });
        builder.addCase(getContacts.rejected, (state) => {
            state.isLoading = false;
            state.isError = true;
            state.user = null;
            state.contacts = null;
        });
        builder.addCase(createContact.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(createContact.fulfilled, (state, action) => {
            if (action.payload.status === 201) {
                state.isLoading = false;
                state.isSuccess = true;
                state.errors = null;
                state.contacts.push(action.payload.data);
            } else if (action.payload.status === 500) {
                state.isLoading = false;
                state.isSuccess = false;
                state.errors = null;
                state.message = action.payload.data;
            } else {
                state.isLoading = false;
                state.isSuccess = false;
                state.message = null;
                state.errors = action.payload.data;
            }
        });
        builder.addCase(createContact.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errors = null;
            state.message = action.payload.data;
        });
        builder.addCase(updateContact.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateContact.fulfilled, (state, action) => {
            state.isLoading = false;
            if (action.payload.status === 201) {
                const { id, name, phone, email } = action.payload.data;
                const exist = state.contacts.filter((contacts) => contacts.id === id);
                if (exist) {
                    exist[0].name = name;
                    exist[0].phone = phone;
                    exist[0].email = email;
                }
            } else if (action.payload.status === 500) {
                state.isLoading = false;
                state.isSuccess = false;
                state.errors = null;
                state.message = action.payload.data;
            } else {
                state.isLoading = false;
                state.isSuccess = false;
                state.message = null;
                state.errors = action.payload.data;
            }
        });
        builder.addCase(updateContact.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.errors = null;
            state.message = action.payload.data;
        });
        builder.addCase(deleteContact.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteContact.fulfilled, (state, action) => {
            if (action.payload.status === 200) {
                state.contacts = state.contacts.filter(
                    (contacts) => contacts.id !== action.payload.data
                );
            }
        });
        builder.addCase(deleteContact.rejected, (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        });
    },
});
export default ContactSlice.reducer;
