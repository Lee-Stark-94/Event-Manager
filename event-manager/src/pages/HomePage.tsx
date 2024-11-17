import React from 'react';
import { 
    Container, 
    Typography, 
    Button, 
    Box, 
    Modal, 
    IconButton,
    useTheme,
    useMediaQuery,
    Alert,
    Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import EventList from '../components/EventList';
import EventForm from '../components/EventForm';
import { Event } from '../types/Event';
import { useAppDispatch, useAppSelector } from '../hooks/useAppRedux';
import { addEvent } from '../store/slices/eventSlice';
import { setModalOpen, showNotification, hideNotification } from '../store/slices/uiSlice';
import EventStats from '../components/EventStats';
import EventsMap from '../components/EventsMap';

const HomePage: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Redux hooks
    const dispatch = useAppDispatch();
    const events = useAppSelector(state => state.events.items);
    const error = useAppSelector(state => state.events.error);
    const isModalOpen = useAppSelector(state => state.ui.isModalOpen);
    const notification = useAppSelector(state => state.ui.notification);

    const handleOpenModal = () => {
        dispatch(setModalOpen(true));
    };

    const handleCloseModal = () => {
        dispatch(setModalOpen(false));
    };

    const handleAddEvent = (newEvent: Omit<Event, 'id'>) => {
        dispatch(addEvent(newEvent));
        dispatch(setModalOpen(false));
        dispatch(showNotification({
            message: 'Evento creado exitosamente',
            type: 'success'
        }));
    };

    const handleCloseNotification = () => {
        dispatch(hideNotification());
    };

    return (
        <Box sx={{ 
            minHeight: '100vh',
            bgcolor: 'background.default',
            py: 4
        }}>
            <Container maxWidth="lg">
                {/* Header */}
                <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    mb: 4
                }}>
                    <Typography 
                        variant="h4" 
                        component="h1"
                        color="primary"
                        sx={{ 
                            fontWeight: 'bold',
                            fontSize: isMobile ? '1.75rem' : '2.125rem'
                        }}
                    >
                        Eventos
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        onClick={handleOpenModal}
                        sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            px: 3
                        }}
                    >
                        Nuevo Evento
                    </Button>
                </Box>

                <Box sx={{ my: 4 }}>
                    <EventsMap events={events} />
                </Box>

                {/* Error Alert */}
                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                {/* Lista de Eventos */}
                {events.length === 0 ? (
                    <Box 
                        sx={{ 
                            textAlign: 'center',
                            py: 8,
                            bgcolor: 'background.paper',
                            borderRadius: 2,
                            boxShadow: 1
                        }}
                    >
                        <Typography 
                            variant="h6" 
                            color="text.secondary"
                            gutterBottom
                        >
                            No hay eventos programados
                        </Typography>
                        <Button
                            variant="outlined"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={handleOpenModal}
                            sx={{ mt: 2, textTransform: 'none' }}
                        >
                            Crear primer evento
                        </Button>
                    </Box>
                ) : (
                    <EventList events={events} />
                )}

                {/* Modal para el formulario */}
                <Modal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-event-form"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2
                    }}
                >
                    <Box sx={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: 'md',
                        maxHeight: '90vh',
                        overflow: 'auto',
                        bgcolor: 'background.paper',
                        borderRadius: 2,
                        boxShadow: 24,
                        p: { xs: 2, sm: 3 }
                    }}>
                        <IconButton
                            onClick={handleCloseModal}
                            sx={{
                                position: 'absolute',
                                right: 8,
                                top: 8,
                                color: 'text.secondary'
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <EventForm onSubmit={handleAddEvent} />
                    </Box>
                </Modal>

                {/* Notificación */}
                <Snackbar
                    open={notification.show}
                    autoHideDuration={6000}
                    onClose={handleCloseNotification}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <Alert 
                        onClose={handleCloseNotification} 
                        severity={notification.type || 'success'}
                        sx={{ width: '100%' }}
                    >
                        {notification.message}
                    </Alert>
                </Snackbar>

                <Box sx={{ mt: 4, p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Estadísticas de Eventos
                    </Typography>
                    <EventStats events={events} />
                </Box>
            </Container>
        </Box>
    );
};

export default HomePage;