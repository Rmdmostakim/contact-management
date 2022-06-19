import { configureStore } from '@reduxjs/toolkit';
import ContactSlice from '../Features/contact/ContactSlice';

const store = configureStore({
    reducer: {
        contacts: ContactSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    'contacts/getContact/fulfilled',
                    'contacts/deleteContact/fulfilled',
                    'contacts/createContact/fulfilled',
                    'contacts/updateContact/fulfilled',
                ],
            },
        }),
});
export default store;
