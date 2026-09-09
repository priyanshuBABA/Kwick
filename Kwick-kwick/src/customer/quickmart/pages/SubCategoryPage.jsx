import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import { ProductCard } from '../components/ProductCard';
import { categories } from '../data/categories';
import { Search, X } from 'lucide-react';
import { getProducts, searchProducts } from '../../../services/catalogApi';

const SubCategoryPage = () => {
  const { subcategoryId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const subcategory = useMemo(() => {
    for (const cat of categories) {
      const sub = cat.subcategories.find(s => s.id === subcategoryId);
      if (sub) return sub;
    }
    return null;
  }, [subcategoryId]);

  useEffect(() => {
    let cancelled = false;
    const loadProducts = searchQuery.trim()
      ? searchProducts(searchQuery.trim(), { limit: 100 })
      : getProducts({ limit: 100 });

    setLoading(true);
    setError('');
    loadProducts
      .then((response) => {
        if (!cancelled) setProducts(response.data);
      })
      .catch((requestError) => {
        if (!cancelled) setError(requestError.message || 'Unable to load products. Please try again.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [searchQuery]);
  
  const filteredProducts = useMemo(() => {
    if (!subcategory) return [];
    const terms = subcategory.name.toLowerCase().split(/[^a-z0-9]+/).filter((term) => term.length > 3);
    return products.filter((product) => {
      const searchable = [product.name, product.category, product.subcategory, ...(product.tags || [])]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return terms.some((term) => searchable.includes(term));
    });
  }, [products, subcategory]);

  if (!subcategory) return <div>Subcategory not found</div>;

  return (
    <div className="min-h-screen bg-[#111111]">
      <Header title={subcategory.name} />
      
      {/* Search Bar */}
      <div className="sticky top-[60px] z-40 bg-[#FFD700] p-4 shadow-md">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder={`Search ${subcategory.name}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border-none rounded-full py-3 pl-12 pr-10 text-sm font-bold text-black outline-none shadow-inner"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4 pb-24">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-white/70">
            <p className="text-lg font-bold">Loading products...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-white/70">
            <p className="text-lg font-bold text-white">Unable to load products</p>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 animate-fadeIn">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-white/50">
            <span className="text-6xl mb-4">🔍</span>
            <p className="text-lg font-bold">No products found</p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default SubCategoryPage;
