import Axios from 'axios'
import { createContext, useContext, useEffect, useReducer } from 'react'
import User from '../types/UserI'
interface State {
    authenticated: boolean
    user: User | null
    loading: boolean
}


interface Action {
    type: string
    payload: any
}

const StateContext = createContext<State>({
    authenticated: false,
    user: null,
    loading: true,
})

const DispatchContext = createContext<any>(
    null)

const reducer = (state: State, { type, payload }: Action) => {
    switch (type) {
        case 'LOGIN':
            return {
                ...state,
                authenticated: true,
                user: payload,
            }
        case 'LOGOUT':
            return { ...state, authenticated: false, user: null }
        case 'STOP_LOADING':
            return { ...state, loading: false }
        default:
            throw new Error(`Unknow action type: ${type}`)
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, defaultDispatch] = useReducer(reducer, {
        user: null,
        authenticated: false,
        loading: true,
    })

    const dispatch = (type: string, payload?: any,) =>
        defaultDispatch({ type, payload })
    async function loadUser() {
        try {
            const res = await Axios.get('/users/me')
            dispatch('LOGIN', res.data.user)
        } catch (err) {
            // console.log(err)
        } finally {
            dispatch('STOP_LOADING')
        }
    }

    useEffect(() => {

        loadUser()
        // eslint-disable-next-line
    }, [])

    return (
        <DispatchContext.Provider value={dispatch as any}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export const useAuthState = () => useContext(StateContext)
export const useAuthDispatch = () => useContext(DispatchContext)
