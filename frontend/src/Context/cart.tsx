import { createContext, useContext, useEffect, useReducer } from 'react'
interface State {
    cartItems: cartItem[]
    shippingInfo: any
}
export interface ShippingInfo {
    address: string
    country: string
    postalCode: number
    city: string
    phoneNo: string
}
export interface cartItem {
    product?: string
    quantity?: number
    name?: string
    price?: number
    image?: string
    stock?: number

}


const StateContext = createContext<State>({ shippingInfo: null, cartItems: [] })
const DispatchContext = createContext<any>(
    null)
const initialState: State = {
    cartItems: [],
    shippingInfo: null
}
const reducer = (state: State = initialState, { type, payload, toast }) => {
    switch (type) {
        case "ADD_TO_CART":
            const isItemExist = state.cartItems?.find(i => i.product === payload.product)
            if (isItemExist) {
                toast && toast({
                    title: "Failed",
                    description: "Item is already present in the cart.",
                    status: "error",
                    duration: 1800,
                    isClosable: true,
                    position: 'top-right'
                })
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item.product === isItemExist.product ? payload : item)
                }

            } else {

                toast && toast({
                    title: "Added",
                    description: "Item Successfully added to cart.",
                    status: "success",
                    duration: 1800,
                    isClosable: true,
                    position: 'top-right'
                })
                const data = {
                    ...state,
                    cartItems: [...state.cartItems, payload]
                }
                localStorage.setItem("state", JSON.stringify(data))
                return data
            }
        case 'REMOVE_FROM_CART':
            const filtered = state.cartItems?.filter(i => i.product !== payload)
            console.log(filtered);

            const data = {
                cartItems: filtered
            }
            if (data.cartItems?.length) {
                console.log("Setting data");

                localStorage.setItem("state", JSON.stringify(data))
            } else {
                console.log("removing data");
                localStorage.removeItem("state")

            }
            return data
        case "STORAGE_TO_CART":
            return payload

        case 'EMPTY_CART':
            localStorage.removeItem("state")

            return initialState
        case "SHIPPING_INFO":
            localStorage.setItem("shippingInfo", JSON.stringify(payload))
            return {
                ...state,
                shippingInfo: payload
            }
        default:
            throw new Error(`Unknow action type: ${type}`)
    }
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, defaultDispatch] = useReducer(reducer, { cartItems: [] })

    const dispatch = (type: string, payload: cartItem, toast?: any) =>
        defaultDispatch({ type, payload, toast })
    useEffect(() => {
        if (JSON.parse(String(localStorage.getItem("state")))) {

            dispatch("STORAGE_TO_CART", JSON.parse(localStorage.getItem("state") as string))
        }
        if (JSON.parse(String(localStorage.getItem("shippingInfo")))) {
            dispatch("SHIPPING_INFO", JSON.parse(localStorage.getItem("shippingInfo") as string))
        }

    }, [])


    return (
        <DispatchContext.Provider value={dispatch as any}>
            <StateContext.Provider value={state}>{children}</StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export const useCartState = () => useContext(StateContext)
export const useCartDispatch = () => useContext(DispatchContext)
