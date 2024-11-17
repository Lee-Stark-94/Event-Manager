import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from './Event';

interface EventState {
    events: Event[];
    isLoading: boolean;
    error: string | null;
}

const initialState: EventState = {
    events: [],
    isLoading: false,
    error: null
};

const eventSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        addEvent: (state, action: PayloadAction<Omit<Event, 'id'>>) => {
            const newEvent: Event = {
                ...action.payload,
                id: Date.now().toString()
            };
            state.events.push(newEvent);
        },
        deleteEvent: (state, action: PayloadAction<string>) => {
            state.events = state.events.filter(event => event.id !== action.payload);
        },
        updateEvent: (state, action: PayloadAction<Event>) => {
            const index = state.events.findIndex(event => event.id === action.payload.id);
            if (index !== -1) {
                state.events[index] = action.payload;
            }
        },
        setEvents: (state, action: PayloadAction<Event[]>) => {
            state.events = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        }
    }
});

export const { 
    addEvent, 
    deleteEvent, 
    updateEvent, 
    setEvents,
    setLoading,
    setError 
} = eventSlice.actions;

export default eventSlice.reducer;