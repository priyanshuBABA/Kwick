import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { categories } from '../data/categories';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const category = categories.find(c => c.id === categoryId);

  if (!category) return <div>Category not found</div>;

  return (
    <div className="min-h-screen bg-[#111111]">
      <Header title={category.name} />
      
      <div className="p-4">
        <div className="bg-white rounded-[20px] p-6 shadow-sm min-h-[calc(100vh-100px)]">
          <div className="grid grid-cols-4 gap-y-8 gap-x-4">
            {category.subcategories.map((sub) => (
              <Link 
                key={sub.id} 
                to={`/customer/household-items/subcategory/${sub.id}`}
                className="flex flex-col items-center gap-3 group no-underline"
              >
                <div className="w-20 h-20 bg-[#E0F7FA] rounded-[24px] flex items-center justify-center shadow-md transition-all group-hover:scale-110 group-active:scale-95 border border-cyan-50">
                  <span className="text-4xl drop-shadow-md">{sub.emoji}</span>
                </div>
                <span className="text-xs font-black text-center text-[#111111] leading-tight font-['Poppins'] uppercase tracking-tight">
                  {sub.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
