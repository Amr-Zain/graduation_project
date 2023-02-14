
import { SET_AUTHED_USER, REMOVE_AUTHED_USER } from "../constants/action_constats";
import { createUser, createUserSession, deleteUserSession } from "../api/data";

const setAuthedUser = ({ token, refreshToken, user }) => ({ type: SET_AUTHED_USER, payload: { token, refreshToken, user }});
const removeAuthedUser = () => ({ type: REMOVE_AUTHED_USER, payload:{  }});

export const logIn = ({ email, password, userType })=>{
    return (dispatch) => {
        //showloading
        return createUserSession({ email, password, userType }).then(({ token, refreshToken, user })=>{
            //hideloading
            dispatch(setAuthedUser({ token, refreshToken, user }));
            //save to sessionStorage
            sessionStorage.setItem('userTokens',JSON.stringify({ token, refreshToken }));
        });
    }
}

export const logOut = ({ token, refreshToken })=>{
    return (dispatch) => {
        //showloading
        return deleteUserSession({ token, refreshToken }).then(()=>{
            //hideloading
            sessionStorage.removeItem('userTokens');
            dispatch(removeAuthedUser());
            //remove from to sessionStorage
        });
    }
}
export const signUp = ( { userType, userData} ) => {
    return (dispatch) => {
        //showloading
        return createUser({ email, password, userType }).then(({ token, refreshToken, user })=>{
            //hideloading
            dispatch(setAuthedUser({ token, refreshToken, user }));
            //save to sessionStorage
            sessionStorage.setItem('userTokens',JSON.stringify({ token, refreshToken }));
        });
    }
}