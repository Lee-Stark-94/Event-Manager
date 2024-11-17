import React from 'react';
import { 
    Grid,
    Card,
    CardContent,
    Typography,
    Container,
    Box
} from '@mui/material';
import { Event } from '../types/Event';
import { 
    CalendarToday,
    LocationOn
} from '@mui/icons-material';
import EventMap from './EventMap';

interface EventListProps {
    events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
    return (
        <Container maxWidth="lg">
            <Typography variant="h4" component="h2" gutterBottom sx={{ my: 4 }}>
                Eventos Programados
            </Typography>
            {events.length === 0 ? (
                <Typography variant="body1" color="text.secondary" align="center">
                    No hay eventos programados
                </Typography>
            ) : (
                <Grid container spacing={3}>
                    {events.map((event) => (
                        <Grid item xs={12} sm={6} md={4} key={event.id}>
                            <Card elevation={3}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>
                                        {event.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" paragraph>
                                        {event.description}
                                    </Typography>
                                    <Box sx={{ mb: 2 }}>
                                        <EventMap event={event} />
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <CalendarToday sx={{ mr: 1, fontSize: 'small' }} />
                                        <Typography variant="body2">
                                            {event.date.toLocaleDateString()}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <LocationOn sx={{ mr: 1, fontSize: 'small', mt: 0.5 }} />
                                        <Typography variant="body2">
                                            {event.location.address}
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default EventList;