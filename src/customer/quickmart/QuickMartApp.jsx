import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import SubCategoryPage from './pages/SubCategoryPage';
import CartPage from './pages/CartPage';

const QuickMartApp = () => {
  return (
    <CartProvider>
      <div className="quickmart-container max-w-[1536px] mx-auto min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:categoryId" element={<CategoryPage />} />
          <Route path="/subcategory/:subcategoryId" element={<SubCategoryPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </div>
    </CartProvider>
  );
};

export default QuickMartApp;
