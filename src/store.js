import { configureStore }  from '@reduxjs/toolkit'
import authedUser from './features/authedUser'
import popularDoctors from './features/populerDoctors'
import citiesAndSpecializations from './features/cities-specializations'
import appointments from './features/appointments'
import search from './features/search'
import medicalHistory from './features/medicalHistory'
export const store = configureStore({
    reducer: {
        authedUser,
        popularDoctors,
        userAppointments: appointments,
        search,
        citiesAndSpecializations,
        medicalHistory
    }
});
