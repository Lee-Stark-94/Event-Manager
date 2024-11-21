import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
    Box,
    TextField,
    Button,
    Typography,
    Alert
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks/useAppRedux';
import { addEvent } from '../store/slices/eventSlice';
import { setModalOpen, showNotification } from '../store/slices/uiSlice';
import LocationPicker from './LocationPicker';
import { Event, Location } from '../types/Event';

interface FormValues {
    title: string;
    description: string;
    date: string;
    location: Location;
}

const EventSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, 'El título debe tener al menos 3 caracteres')
        .max(50, 'El título no puede exceder 50 caracteres')
        .required('El título es requerido'),
    description: Yup.string()
        .min(10, 'La descripción debe tener al menos 10 caracteres')
        .max(500, 'La descripción no puede exceder 500 caracteres')
        .required('La descripción es requerida'),
    date: Yup.string()
        .required('La fecha es requerida'),
    location: Yup.object().shape({
        lat: Yup.number().required('La latitud es requerida'),
        lng: Yup.number().required('La longitud es requerida'),
        address: Yup.string().required('La dirección es requerida')
    })
});

const initialValues: FormValues = {
    title: '',
    description: '',
    date: '',
    location: {
        lat: 0,
        lng: 0,
        address: ''
    }
};

interface EventFormProps {
    onSubmit: (newEvent: Omit<Event, 'id'>) => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit }) => {
    const dispatch = useAppDispatch();
    const selectedEvent = useAppSelector(state => state.events.selectedEvent);

    const getInitialValues = (): FormValues => {
        if (selectedEvent) {
            return {
                ...selectedEvent,
                date: selectedEvent.date.toISOString().slice(0, 16),
            };
        }
        return initialValues;
    };

    const handleSubmit = async (values: FormValues) => {
        try {
            const eventData: Omit<Event, 'id'> = {
                ...values,
                date: new Date(values.date)
            };
            
            dispatch(addEvent(eventData));
            dispatch(showNotification({
                message: 'Evento creado exitosamente',
                type: 'success'
            }));
            dispatch(setModalOpen(false));
        } catch (error) {
            dispatch(showNotification({
                message: 'Error al crear el evento',
                type: 'error'
            }));
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Typography 
                variant="h5" 
                component="h2" 
                gutterBottom
                color="primary"
                sx={{ fontWeight: 'bold' }}
            >
                {selectedEvent ? 'Editar Evento' : 'Crear Nuevo Evento'}
            </Typography>

            <Formik
                initialValues={getInitialValues()}
                validationSchema={EventSchema}
                onSubmit={handleSubmit}
                enableReinitialize
            >
                {({ errors, touched, values, setFieldValue, isSubmitting }) => (
                    <Form>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <Field
                                as={TextField}
                                name="title"
                                label="Título"
                                fullWidth
                                error={touched.title && Boolean(errors.title)}
                                helperText={touched.title && errors.title}
                            />

                            <Field
                                as={TextField}
                                name="description"
                                label="Descripción"
                                multiline
                                rows={4}
                                fullWidth
                                error={touched.description && Boolean(errors.description)}
                                helperText={touched.description && errors.description}
                            />

                            <Field
                                as={TextField}
                                name="date"
                                label="Fecha y Hora"
                                type="datetime-local"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                error={touched.date && Boolean(errors.date)}
                                helperText={touched.date && errors.date}
                            />

                            <Box sx={{ my: 2 }}>
                                <Typography 
                                    variant="subtitle1" 
                                    gutterBottom
                                    color="primary"
                                    sx={{ fontWeight: 'medium' }}
                                >
                                    Ubicación
                                </Typography>
                                <LocationPicker
                                    location={values.location}
                                    onLocationChange={(location) => {
                                        setFieldValue('location', location);
                                    }}
                                />
                                {touched.location && errors.location && (
                                    <Alert severity="error" sx={{ mt: 1 }}>
                                        Por favor selecciona una ubicación
                                    </Alert>
                                )}
                            </Box>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth
                                disabled={isSubmitting}
                                sx={{
                                    mt: 2,
                                    py: 1.5,
                                    fontWeight: 'bold',
                                    textTransform: 'none'
                                }}
                            >
                                {isSubmitting ? 'Guardando...' : selectedEvent ? 'Guardar Cambios' : 'Crear Evento'}
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default EventForm;