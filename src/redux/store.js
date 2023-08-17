import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import * as rp from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import adminAuthReducer from './slices/adminAuth.slice';

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['adminAuth']
};

const reducer = combineReducers({
    adminAuth: adminAuthReducer
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [
                rp.FLUSH,
                rp.REHYDRATE,
                rp.PAUSE,
                rp.PERSIST,
                rp.PURGE,
                rp.REGISTER
            ]
        }
    })
})

export let persistor = persistStore(store);

export default store;