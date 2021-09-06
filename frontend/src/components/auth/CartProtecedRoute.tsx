import { Fragment } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuthState } from '../../Context/auth'
import { useCartState } from '../../Context/cart'
const CartProtectedRoute = ({ component: Component, ...rest }) => {
    const cart = useCartState()
    const auth = useAuthState()

    return (
        <Fragment>

            <Route {...rest}
                render={props => {
                    if (!cart.cartItems?.length || (!auth.loading && !auth.user)) {
                        return <Redirect to="/" />
                    }
                    return <Component cart={cart}  {...props} />


                }}
            />


        </Fragment>
    )
}

export default CartProtectedRoute
