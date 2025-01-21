import { configureStore }  from '@reduxjs/toolkit';
import authedUser from './features/authedUser';
import populars from './features/populers';
import citiesAndSpecializations from './features/cities-specializations';
import appointments from './features/appointments';
import search from './features/search';
import medicalHistory from './features/medicalHistory';
import chats from './features/chats';

export const store = configureStore({
    reducer: {
        authedUser,
        populars,
        appointments,
        search,
        citiesAndSpecializations,
        medicalHistory,
        chats
    }
});
