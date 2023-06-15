import React, { useReducer, createContext, useEffect } from 'react';
import { UserReducer } from './UserReducer';

const INITIAL_STATE = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    isFetching: false,
    error: false
}

export const UserContext = createContext(INITIAL_STATE);

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(UserReducer, 
    INITIAL_STATE);

    useEffect(() => {
        if(state.user) {
            const { username, accountType, accessToken } = state.user;
            const fetchedUser = {
                username,
                accessToken,
                accountType
            }
            localStorage.setItem("user", JSON.stringify(fetchedUser)); 
        }
    }, [state.user])

    return (
        <UserContext.Provider value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>{children}</UserContext.Provider>
    )
};