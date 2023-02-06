import { configureStore }  from '@reduxjs/toolkit'
import authedUserReducer from './features/authedUser'
import signupFormReducer from './features/sigupFormData'
export const store = configureStore({
    reducer: {
        authedUser: authedUserReducer,
    }
});
