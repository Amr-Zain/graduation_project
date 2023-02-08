import { configureStore }  from '@reduxjs/toolkit'
import authedUserReducer from './features/authedUser'
import popularDoctorsReducer from './features/populerDoctors'
import appointmentsReducer from './features/appointments'
export const store = configureStore({
    reducer: {
        authedUser: authedUserReducer,
        popularDoctors: popularDoctorsReducer,
        userAppointments: appointmentsReducer
    }
});
