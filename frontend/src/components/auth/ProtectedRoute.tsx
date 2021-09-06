import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthState } from '../../Context/auth'
const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { user, loading, authenticated } = useAuthState()
    return (
        <Fragment>
            {loading === false && (
                <Route {...rest}
                    render={props => {
                        if (!user && !authenticated) {
                            return <Redirect to="/login" />
                        }
                        return <Component {...props} user={user} />


                    }}
                />

            )}
        </Fragment>
    )
}

export default ProtectedRoute
