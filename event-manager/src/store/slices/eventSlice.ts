import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../types/Event';

interface EventState {
    items: Event[];
    selectedEvent: Event | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: EventState = {
    items: [],
    selectedEvent: null,
    isLoading: false,
    error: null
};

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        // Agregar evento
        addEvent: (state, action: PayloadAction<Omit<Event, 'id'>>) => {
            const newEvent: Event = {
                ...action.payload,
                id: Date.now().toString()
            };
            state.items.push(newEvent);
            state.error = null;
        },
        // Eliminar evento
        deleteEvent: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(event => event.id !== action.payload);
        },
        // Actualizar evento
        updateEvent: (state, action: PayloadAction<Event>) => {
            const index = state.items.findIndex(event => event.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        // Seleccionar evento para editar
        setSelectedEvent: (state, action: PayloadAction<Event | null>) => {
            state.selectedEvent = action.payload;
        },
        // Manejar estado de carga
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        // Manejar errores
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { 
    addEvent, 
    deleteEvent, 
    updateEvent, 
    setSelectedEvent,
    setLoading,
    setError 
} = eventSlice.actions;

export default eventSlice.reducer;