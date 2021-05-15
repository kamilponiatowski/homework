import React, { FC, Reducer, useCallback, useMemo, useReducer } from "react";
const mockUser = { display_name: 'Placki' }

interface State {
    isLoggedIn: boolean,
    user: { display_name: string } | null
}
const initialState: State = {
    isLoggedIn: false, user: null
}
function ProviderError() {
    throw new Error('User context requires Provider!')
}

export const UserContext = React.createContext<State & {
    login: () => void,
    logout: () => void
}>({
    ...initialState,
    login: ProviderError, logout: ProviderError
})

type Actions = { type: 'LOGIN_SUCCESS' } | { type: 'LOGOUT' }

const reducer: Reducer<State, Actions> = (state, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS': return { ...state, isLoggedIn: true, user: mockUser };
        case 'LOGOUT': return { ...state, isLoggedIn: false, user: null };
        default: return state
    }
}

interface Props { }

export const UserContextProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const login = useCallback(() => {
        dispatch({ type: 'LOGIN_SUCCESS' })
    }, [])

    const logout = useCallback(() => {
        dispatch({ type: 'LOGOUT' })
    }, [])

    const value = useMemo(() => ({
        ...state, login, logout
    }), [state])

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider >
    )

}

/* <UserContextProvider>tu sa dzieci!</UserContextProvider> */
