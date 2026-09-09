import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './CartContext'
import { AppProvider } from './AppContext'
import { AuthProvider } from './context/AuthContext'
import { LocationProvider } from './context/LocationContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <LocationProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </LocationProvider>
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
