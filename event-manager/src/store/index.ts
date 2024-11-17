import { configureStore } from '@reduxjs/toolkit';
import eventReducer from './slices/eventSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
    reducer: {
        events: eventReducer,
        ui: uiReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignorar las fechas en las acciones y el estado
                ignoredActions: ['events/addEvent', 'events/updateEvent'],
                ignoredPaths: ['events.items.date']
            }
        })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;