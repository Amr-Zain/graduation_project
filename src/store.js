import { configureStore }  from '@reduxjs/toolkit'
import authedUser from './features/authedUser'
import popularDoctors from './features/populerDoctors'
import appointments from './features/appointments'
import search from './features/search'
export const store = configureStore({
    reducer: {
        authedUser,
        popularDoctors,
        userAppointments: appointments,
        search,
    }
});
