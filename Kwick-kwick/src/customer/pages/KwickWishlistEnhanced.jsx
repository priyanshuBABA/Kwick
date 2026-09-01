import React, { useState } from 'react';
import MobileFrame from '../../components/MobileFrame';
import BottomNav from '../../components/BottomNav';
import { Heart, ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { WISHLIST_ITEMS } from '../../data/htmlDesignData';
import { useCart } from '../../CartContext';

const KwickWishlistEnhanced = () => {
  const [wishlist, setWishlist] = useState(WISHLIST_ITEMS);
  const [toast, setToast] = useState(null);
  const { addToCart } = useCart();

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handleRemove = (id) => {
    const item = wishlist.find(w => w.id === id);
    setWishlist(wishlist.filter(w => w.id !== id));
    showToast(`❌ ${item.n} removed from wishlist`);
  };

  const handleAddToCart = (item) => {
    addToCart({ ...item, quantity: 1 });
    showToast(`✅ ${item.n} added to cart`);
  };

  const handleMoveAll = () => {
    const count = wishlist.length;
    wishlist.forEach(item => addToCart({ ...item, quantity: 1 }));
    setWishlist([]);
    showToast(`🛒 ${count} items moved to cart`);
  };

  const handleNotify = (item) => {
    showToast(`🔔 You'll be notified when ${item.n} is back in stock`);
  };

  return (
    <MobileFrame>

      {/* Toast */}
      {toast && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white px-4 py-3 rounded-lg z-50 animate-fade-in-down">
          {toast}
        </div>
      )}

      <div className="pb-24">
        {/* Header with Move All */}
        <div className="px-6 pt-6 pb-6">
          <div className="flex justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-1">❤️ Wishlist</h1>
              <p className="text-sm text-gray-600">{wishlist.length} items saved for later</p>
            </div>
            {wishlist.length > 0 && (
              <button
                onClick={handleMoveAll}
                className="bg-slate-900 hover:bg-slate-800 text-white font-black px-4 py-3 rounded-xl transition-all transform hover:scale-105 active:scale-95 whitespace-nowrap flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Move All
              </button>
            )}
          </div>
        </div>

        {/* Empty State */}
        {wishlist.length === 0 ? (
          <div className="px-6 flex flex-col items-center justify-center py-16 text-center">
            <div className="text-6xl mb-4 opacity-50">💔</div>
            <h2 className="font-black text-2xl text-slate-900 mb-2">Your wishlist is empty</h2>
            <p className="text-sm text-gray-600 mb-6 max-w-xs">
              Tap the heart on any product to save it here for later.
            </p>
            <a 
              href="/customer/home"
              className="inline-flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white font-bold px-8 py-3 rounded-xl transition-all transform hover:scale-105 active:scale-95"
            >
              <ShoppingCart className="w-5 h-5" />
              Start Shopping
            </a>
          </div>
        ) : (
          <>
            {/* Wishlist Grid */}
            <div className="px-6 mb-8">
              <div className="grid grid-cols-2 gap-4">
                {wishlist.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-lg hover:border-red-300 transition-all transform hover:scale-105 group relative"
                  >
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="absolute top-2 right-2 z-10 bg-red-100 hover:bg-red-200 text-red-600 p-2 rounded-lg transition-all transform hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    {/* Discount Badge */}
                    {item.save && (
                      <div className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] font-black px-2 py-1 rounded-full z-10">
                        {item.save}
                      </div>
                    )}

                    {/* Heart Icon */}
                    <div className="absolute bottom-2 right-2 z-10 animate-pulse">
                      <Heart className="w-6 h-6 text-red-500 fill-red-500" />
                    </div>

                    {/* Product Content */}
                    <div className="p-4 text-center">
                      <div className="text-4xl mb-3">{item.e}</div>
                      <h3 className="font-bold text-sm text-slate-900 mb-2 line-clamp-2 min-h-[2.5rem]">
                        {item.n}
                      </h3>

                      {/* Stock Status */}
                      <div
                        className={`text-xs font-black mb-3 py-1 px-2 rounded-full inline-block ${
                          item.stock
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {item.stock
                          ? '✅ In Stock (15 min)'
                          : '❌ Out of Stock'}
                      </div>

                      {/* Price */}
                      <div className="mb-3">
                        <span className="font-black text-xl text-orange-600">₹{item.p}</span>
                      </div>

                      {/* Action Button */}
                      {item.stock ? (
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add to Cart
                        </button>
                      ) : (
                        <button
                          onClick={() => handleNotify(item)}
                          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg transition-all"
                        >
                          🔔 Notify Me
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="px-6 mb-8">
              <h3 className="font-black text-lg text-slate-900 mb-4">You might also like</h3>
              <div className="bg-gradient-to-r from-orange-50 to-pink-50 border border-orange-200 rounded-2xl p-6">
                <p className="text-sm text-gray-700 mb-4">
                  Get personalized recommendations based on your wishlist. Enable notifications to never miss a deal!
                </p>
                <button 
                  onClick={() => showToast('🔔 Notifications enabled')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 rounded-lg transition-all"
                >
                  Enable Recommendations
                </button>
              </div>
            </div>

            {/* Share Wishlist */}
            <div className="px-6 mb-8">
              <button 
                onClick={() => showToast('📤 Wishlist link copied to clipboard!')}
                className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-black py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                📤 Share Wishlist
              </button>
            </div>
          </>
        )}
      </div>

      <BottomNav />
    </MobileFrame>
  );
};

export default KwickWishlistEnhanced;
