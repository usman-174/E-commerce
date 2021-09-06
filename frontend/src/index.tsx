import {
  ChakraProvider
} from "@chakra-ui/react";
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { AuthProvider } from "./Context/auth";
import { CartProvider } from "./Context/cart";
ReactDOM.render(<React.StrictMode >


  <ChakraProvider >
    <AuthProvider>
      <CartProvider>

        < App />
      </CartProvider>
    </AuthProvider>
  </ChakraProvider>
</React.StrictMode>,
  document.getElementById('root')
);
