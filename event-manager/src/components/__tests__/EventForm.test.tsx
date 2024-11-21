import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EventForm from '../EventForm';
import { Provider } from 'react-redux';
import { store } from '../../store';

describe('EventForm', () => {
    test('renders form fields', () => {
        render(
            <Provider store={store}>
                <EventForm onSubmit={() => {}} />
            </Provider>
        );

        expect(screen.getByLabelText(/título/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/descripción/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/fecha y hora/i)).toBeInTheDocument();
    });

    test('submits the form with valid data', () => {
        render(
            <Provider store={store}>
                <EventForm onSubmit={() => {}} />
            </Provider>
        );

        fireEvent.change(screen.getByLabelText(/título/i), { target: { value: 'Evento de prueba' } });
        fireEvent.change(screen.getByLabelText(/descripción/i), { target: { value: 'Descripción del evento' } });
        fireEvent.change(screen.getByLabelText(/fecha y hora/i), { target: { value: '2023-12-31T12:00' } });
        fireEvent.click(screen.getByRole('button', { name: /crear evento/i }));

    });

    test('shows validation errors', async () => {
        render(
            <Provider store={store}>
                <EventForm onSubmit={() => {}} />
            </Provider>
        );

        fireEvent.click(screen.getByRole('button', { name: /crear evento/i }));

        expect(await screen.findByText(/el título es requerido/i)).toBeInTheDocument();
        expect(await screen.findByText(/la descripción es requerida/i)).toBeInTheDocument();
        expect(await screen.findByText(/la fecha es requerida/i)).toBeInTheDocument();
    });
}); 