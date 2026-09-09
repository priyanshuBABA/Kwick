import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from './context/AuthContext';
import { addCartItem, clearCart as clearCartRequest, getCart, removeCartItem, updateCartItem } from './services/cartApi';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token, loading: authLoading } = useAuth();
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const applyCart = useCallback((nextCart) => {
    const items = nextCart?.items || [];
    setCart(items);
    setCartCount(nextCart?.itemCount || 0);
    setCartTotal(Number(nextCart?.subtotal || 0));
  }, []);

  const runCartRequest = useCallback(async (request) => {
    if (!token) return null;
    setLoading(true);
    setError('');
    try {
      const nextCart = await request(token);
      applyCart(nextCart);
      return nextCart;
    } catch (requestError) {
      setError(requestError.message || 'Unable to update cart. Please try again.');
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, [applyCart, token]);

  useEffect(() => {
    if (authLoading) return undefined;
    if (!token) {
      applyCart(null);
      return undefined;
    }

    let cancelled = false;
    setLoading(true);
    setError('');
    getCart(token)
      .then((nextCart) => {
        if (!cancelled) applyCart(nextCart);
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message || 'Unable to load cart. Please try again.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [applyCart, authLoading, token]);

  const addToCart = (product) => runCartRequest((authToken) => addCartItem(product.id, product.quantity > 0 ? product.quantity : 1, authToken));

  const removeFromCart = (productId) => runCartRequest((authToken) => removeCartItem(productId, authToken));

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    return runCartRequest((authToken) => updateCartItem(productId, quantity, authToken));
  };

  const clearCart = () => runCartRequest((authToken) => clearCartRequest(authToken));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};
