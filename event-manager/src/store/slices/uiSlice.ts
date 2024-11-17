import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
    isModalOpen: boolean;
    isLoading: boolean;
    notification: {
        show: boolean;
        message: string;
        type: 'success' | 'error' | 'info' | 'warning' | null;
    };
}

const initialState: UIState = {
    isModalOpen: false,
    isLoading: false,
    notification: {
        show: false,
        message: '',
        type: null
    }
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setModalOpen: (state, action: PayloadAction<boolean>) => {
            state.isModalOpen = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        showNotification: (state, action: PayloadAction<{
            message: string;
            type: 'success' | 'error' | 'info' | 'warning';
        }>) => {
            state.notification = {
                show: true,
                message: action.payload.message,
                type: action.payload.type
            };
        },
        hideNotification: (state) => {
            state.notification = {
                show: false,
                message: '',
                type: null
            };
        }
    }
});

export const { 
    setModalOpen, 
    setLoading, 
    showNotification, 
    hideNotification 
} = uiSlice.actions;

export default uiSlice.reducer;