import Axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { SWRConfig } from "swr";
import Home from "./pages/Home";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import ProductDetails from './pages/ProductDetails';
import Login from './pages/Login';
import { useAuthState } from './Context/auth';
import { MoonLoader } from 'react-spinners';
import Register from './pages/Register';
import Profile from './pages/Profile';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UpdateProfile from './pages/UpdateProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Cart from './pages/Cart';
import CartProtectedRoute from './components/auth/CartProtecedRoute';
import Shipping from './pages/Shipping';
import confirm from './pages/confirm';
Axios.defaults.baseURL = 'http://localhost:4000/api'
Axios.defaults.withCredentials = true
const fetcher = async (url: string) => {
  try {
    const { data } = await Axios.get(url)
    return data
  } catch (error) {
    throw error.response.data
  }
}
function App() {
  const { loading } = useAuthState()
  if (loading) return <MoonLoader color='#FF6347' />
  return (
    <SWRConfig
      value={{
        fetcher,
        dedupingInterval: 50000,
      }}
    >

      <Router>
        <Header />
        <Route exact path='/' component={Home} />
        <Route exact path='/search/:keyword' component={Home} />
        <Route exact path='/product/:id' component={ProductDetails} />
        <CartProtectedRoute exact path='/cart' component={Cart} />
        <CartProtectedRoute exact path='/shipping' component={Shipping} />
        <CartProtectedRoute exact path='/order/confirm' component={confirm} />
        <Route exact path='/forgot-Password/' component={ForgotPassword} />
        <Route exact path='/reset-password/:token' component={ResetPassword} />
        <ProtectedRoute exact path='/profile' component={Profile} />
        <ProtectedRoute exact path='/updateProfile' component={UpdateProfile} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Footer />
      </Router>
    </SWRConfig>
  );
}

export default App;
