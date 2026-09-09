import React from 'react';
import MobileFrame from '../../components/MobileFrame';
import BottomNav from '../../components/BottomNav';
import { WISHLIST_ITEMS } from '../../data/htmlDesignData';
import { Heart, ShoppingCart } from 'lucide-react';

const KwickWishlistPage = () => {
  const handleMoveAll = () => {
    alert('🛒 All items moved to cart');
  };

  const handleAddToCart = (item) => {
    alert(`✅ ${item.n} added to cart`);
  };

  const handleNotify = (item) => {
    alert(`🔔 You will be notified when ${item.n} is back in stock`);
  };

  return (
    <MobileFrame>
      <div className="pb-20">
        {/* Header with Move All Button */}
        <div className="mx-6 my-6 bg-white border border-gray-200 rounded-2xl p-5 flex justify-between items-center">
          <b className="text-sm text-slate-900">{WISHLIST_ITEMS.length} items saved to your wishlist</b>
          <button
            onClick={handleMoveAll}
            className="bg-slate-900 text-white text-xs font-black px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Move All to Cart
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="px-6 mb-8">
          <div className="grid grid-cols-2 gap-4">
            {WISHLIST_ITEMS.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-2xl p-4 hover:shadow-lg transition-all"
              >
                {/* Discount Tag */}
                {item.save && (
                  <div className="bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-full w-fit mb-2 ml-auto">
                    {item.save}
                  </div>
                )}

                {/* Heart Icon */}
                <div className="flex justify-end mb-3">
                  <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                </div>

                {/* Product Emoji */}
                <div className="text-3xl text-center mb-3">{item.e}</div>

                {/* Product Name */}
                <b className="block text-sm text-slate-900 mb-2 text-center line-clamp-2">
                  {item.n}
                </b>

                {/* Stock Status */}
                <div
                  className={`text-xs font-bold text-center mb-3 ${
                    item.stock ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {item.stock
                    ? '✅ In Stock (15 Mins Delivery)'
                    : '❌ Out of Stock'}
                </div>

                {/* Price and Button */}
                <div className="flex justify-between items-center gap-2">
                  <span className="font-black text-lg text-slate-900">₹{item.p}</span>
                  {item.stock ? (
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-xs font-black px-2 py-2 rounded-lg transition-colors flex items-center justify-center gap-1"
                    >
                      <ShoppingCart className="w-3.5 h-3.5" /> Add
                    </button>
                  ) : (
                    <button
                      onClick={() => handleNotify(item)}
                      className="flex-1 bg-gray-100 text-gray-600 text-xs font-black px-2 py-2 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                      Notify Me
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </MobileFrame>
  );
};

export default KwickWishlistPage;
