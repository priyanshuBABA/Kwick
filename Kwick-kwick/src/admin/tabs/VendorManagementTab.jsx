import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Store, Plus, Search, Filter, Edit, Trash2, Power, ShieldCheck, AlertCircle, MapPin, Phone, Eye, X, ArrowLeft, Layers, Tag, Package, CheckCircle2, ChevronRight } from 'lucide-react';

const VendorManagementTab = () => {
  const { 
    categories, 
    categoryItems, 
    vendors, 
    addCategory, 
    updateCategory, 
    deleteCategory, 
    addCategoryItem, 
    updateCategoryItem, 
    deleteCategoryItem, 
    toggleCategoryItemStatus,
    addVendor, 
    updateVendor, 
    deleteVendor, 
    toggleVendorStatus 
  } = useAdmin();

  // View States: 'categoriesGrid' | 'categoryDetail' | 'allVendorsTable'
  const [viewMode, setViewMode] = useState('categoriesGrid');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Modals
  const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const [isAddVendorModalOpen, setIsAddVendorModalOpen] = useState(false);
  const [isEditVendorModalOpen, setIsEditVendorModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // Forms
  const [categoryForm, setCategoryForm] = useState({ name: '', subtitle: '', emoji: '🏪' });
  const [itemForm, setItemForm] = useState({ name: '', price: '', unit: '', vendor: '' });
  const [vendorForm, setVendorForm] = useState({ name: '', category: '', owner: '', phone: '', location: '', commissionRate: 10 });

  // Filtered categories
  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Filtered items inside a category
  const activeCategoryItems = selectedCategory ? (categoryItems[selectedCategory.id] || []) : [];
  const filteredCategoryItems = activeCategoryItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.vendor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Vendors belonging to selected category
  const activeCategoryVendors = selectedCategory 
    ? vendors.filter(v => v.category.toLowerCase().includes(selectedCategory.name.toLowerCase()) || selectedCategory.name.toLowerCase().includes(v.category.toLowerCase()))
    : [];

  // Handlers for Category CRUD
  const handleOpenAddCategory = () => {
    setCategoryForm({ name: '', subtitle: '', emoji: '🏪' });
    setIsAddCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat, e) => {
    e.stopPropagation();
    setSelectedCategory(cat);
    setCategoryForm({ name: cat.name, subtitle: cat.subtitle, emoji: cat.emoji });
    setIsEditCategoryModalOpen(true);
  };

  const handleDeleteCategory = (catId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this Business Category and all its inner listings?")) {
      deleteCategory(catId);
    }
  };

  const handleAddCategorySubmit = (e) => {
    e.preventDefault();
    addCategory(categoryForm);
    setIsAddCategoryModalOpen(false);
  };

  const handleEditCategorySubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      updateCategory(selectedCategory.id, categoryForm);
      setIsEditCategoryModalOpen(false);
    }
  };

  // Handlers for Inner Section Item CRUD
  const handleOpenAddItem = () => {
    const defaultVendor = activeCategoryVendors.length > 0 ? activeCategoryVendors[0].name : 'Default Vendor';
    setItemForm({ name: '', price: '', unit: 'per item', vendor: defaultVendor });
    setIsAddItemModalOpen(true);
  };

  const handleOpenEditItem = (item) => {
    setSelectedItem(item);
    setItemForm({ name: item.name, price: item.price, unit: item.unit, vendor: item.vendor });
    setIsEditItemModalOpen(true);
  };

  const handleAddItemSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory) {
      addCategoryItem(selectedCategory.id, {
        name: itemForm.name,
        price: Number(itemForm.price),
        unit: itemForm.unit,
        vendor: itemForm.vendor
      });
      setIsAddItemModalOpen(false);
    }
  };

  const handleEditItemSubmit = (e) => {
    e.preventDefault();
    if (selectedCategory && selectedItem) {
      updateCategoryItem(selectedCategory.id, selectedItem.id, {
        name: itemForm.name,
        price: Number(itemForm.price),
        unit: itemForm.unit,
        vendor: itemForm.vendor
      });
      setIsEditItemModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header & View Mode Switcher */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            {viewMode === 'categoryDetail' && (
              <button 
                onClick={() => setViewMode('categoriesGrid')}
                className="p-1.5 hover:bg-slate-100 rounded-xl text-slate-600 transition flex items-center gap-1 text-xs font-bold mr-1"
              >
                <ArrowLeft size={16} /> Back
              </button>
            )}
            <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
              <Store className="text-amber-500" /> 
              {viewMode === 'categoryDetail' ? `${selectedCategory.name} — Inside Section Admin` : 'Vendor Business Modules'}
            </h2>
          </div>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {viewMode === 'categoryDetail' 
              ? `Manage all items, services, products, pricing & vendors inside ${selectedCategory.name}`
              : 'Add, edit, or delete business categories & manage inner listings for each section.'}
          </p>
        </div>

        {/* View Selector Tabs */}
        <div className="flex bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setViewMode('categoriesGrid')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              viewMode === 'categoriesGrid' || viewMode === 'categoryDetail'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5"><Layers size={14} /> Category Grid</span>
          </button>
          <button
            onClick={() => setViewMode('allVendorsTable')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg transition ${
              viewMode === 'allVendorsTable'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span className="flex items-center gap-1.5"><Store size={14} /> All Vendors List</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: CATEGORY GRID VIEW (MATCHING THE USER'S ATTACHED IMAGE)           */}
      {/* ========================================================================= */}
      {viewMode === 'categoriesGrid' && (
        <div className="space-y-6">
          {/* Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search business category (e.g. Doctor, Ambulance, Fresh Mandi)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
              />
            </div>
            <div className="text-xs text-slate-500 font-semibold">
              Showing <span className="text-slate-900 font-bold">{filteredCategories.length}</span> Business Categories
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredCategories.map((cat) => {
              const itemCount = (categoryItems[cat.id] || []).length;
              return (
                <div
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setViewMode('categoryDetail');
                  }}
                  className="group bg-white rounded-3xl border border-slate-200/90 p-5 shadow-sm hover:shadow-xl hover:border-amber-400 transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[170px] relative overflow-hidden"
                >
                  {/* Top Row: Icon & Admin Quick Actions */}
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-amber-100/70 flex items-center justify-center text-3xl group-hover:scale-110 transition transform">
                      {cat.emoji}
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition">
                      <button
                        onClick={(e) => handleOpenEditCategory(cat, e)}
                        title="Edit Category Name/Icon"
                        className="p-1.5 bg-slate-100 hover:bg-amber-100 text-slate-600 hover:text-amber-800 rounded-lg transition"
                      >
                        <Edit size={14} />
                      </button>
                      <button
                        onClick={(e) => handleDeleteCategory(cat.id, e)}
                        title="Delete Category"
                        className="p-1.5 bg-slate-100 hover:bg-rose-100 text-slate-600 hover:text-rose-700 rounded-lg transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Middle Info */}
                  <div className="mt-4">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition flex items-center justify-between">
                      {cat.name}
                      <ChevronRight size={16} className="text-slate-300 group-hover:text-amber-500 group-hover:translate-x-1 transition" />
                    </h3>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">{cat.subtitle}</p>
                  </div>

                  {/* Bottom Counter Badge */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-bold text-slate-500">
                    <span className="flex items-center gap-1">
                      <Package size={12} className="text-amber-500" /> {itemCount} Listings Inside
                    </span>
                    <span className="text-amber-600 font-extrabold text-[10px] uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded-full">
                      Click to Manage &rarr;
                    </span>
                  </div>
                </div>
              );
            })}

            {/* ADD NEW CARD (MATCHING ORANGE CARD IN USER'S IMAGE) */}
            <div
              onClick={handleOpenAddCategory}
              className="bg-gradient-to-br from-orange-500 to-amber-600 text-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[170px] transform hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-black">
                +
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-black text-white">Add New</h3>
                <p className="text-xs text-orange-100 font-medium mt-0.5">Other business category</p>
              </div>
              <div className="mt-4 text-xs font-bold text-white/90 flex items-center gap-1">
                Create Category Card &rarr;
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: INSIDE SECTION VIEW (DETAIL OF SELECTED CATEGORY)                  */}
      {/* ========================================================================= */}
      {viewMode === 'categoryDetail' && selectedCategory && (
        <div className="space-y-6">
          {/* Top Banner for Inside Section */}
          <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border border-amber-200/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white shadow-md flex items-center justify-center text-4xl">
                {selectedCategory.emoji}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-200/60 px-2.5 py-0.5 rounded-full">
                    Category Module
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">• ID: {selectedCategory.id}</span>
                </div>
                <h2 className="text-2xl font-black text-slate-900 mt-1">{selectedCategory.name}</h2>
                <p className="text-xs text-slate-600 font-medium">{selectedCategory.subtitle} — Admin CRUD Control Panel</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleOpenAddItem}
                className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
              >
                <Plus size={16} /> Add Item / Service to {selectedCategory.name}
              </button>
            </div>
          </div>

          {/* INSIDE SECTION LISTINGS DATA TABLE */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden space-y-4 p-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Tag size={18} className="text-amber-500" /> Products, Services & Offerings Inside "{selectedCategory.name}"
              </h3>
              <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                {filteredCategoryItems.length} Items Listed
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Item / Service Name</th>
                    <th className="py-3.5 px-4">Price</th>
                    <th className="py-3.5 px-4">Unit / Weight</th>
                    <th className="py-3.5 px-4">Vendor / Store Provider</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                  {filteredCategoryItems.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-10 text-slate-400 font-medium">
                        No items or services currently listed inside this section. Click <b>"Add Item / Service"</b> above to add one!
                      </td>
                    </tr>
                  ) : (
                    filteredCategoryItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-4 font-bold text-slate-900">
                          {item.name}
                          <div className="text-[10px] text-slate-400">ID: {item.id}</div>
                        </td>
                        <td className="py-3.5 px-4 font-black text-amber-600 text-sm">
                          ₹{item.price}
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-600">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                            {item.unit}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-semibold text-slate-800">
                          {item.vendor}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => toggleCategoryItemStatus(selectedCategory.id, item.id)}
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                              item.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                            }`}
                          >
                            <Power size={11} /> {item.status}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => handleOpenEditItem(item)}
                              title="Edit Price, Name or Vendor"
                              className="p-1.5 hover:bg-amber-50 text-amber-600 rounded-lg transition"
                            >
                              <Edit size={15} />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`Delete item "${item.name}"?`)) {
                                  deleteCategoryItem(selectedCategory.id, item.id);
                                }
                              }}
                              title="Delete Item"
                              className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg transition"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: ALL VENDORS TABLE VIEW                                            */}
      {/* ========================================================================= */}
      {viewMode === 'allVendorsTable' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Registered Business Vendors ({vendors.length})</h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-4">Vendor Name</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Owner & Phone</th>
                    <th className="py-3.5 px-4">Commission %</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {vendors.map((v) => (
                    <tr key={v.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{v.name}</td>
                      <td className="py-3.5 px-4 font-semibold text-slate-600">{v.category}</td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800">{v.owner}</div>
                        <div className="text-[11px] text-slate-400">{v.phone}</div>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-amber-600">{v.commissionRate}%</td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => toggleVendorStatus(v.id)}
                          className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${v.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}
                        >
                          {v.status}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete vendor ${v.name}?`)) {
                              deleteVendor(v.id);
                            }
                          }}
                          className="p-1.5 hover:bg-rose-50 text-rose-600 rounded-lg"
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODALS SECTION                                                            */}
      {/* ========================================================================= */}

      {/* ADD NEW BUSINESS CATEGORY MODAL */}
      {isAddCategoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-amber-50">
              <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
                <Store size={18} className="text-amber-600" /> Add New Business Category
              </h3>
              <button onClick={() => setIsAddCategoryModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddCategorySubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Diagnostic Labs, Pet Care, Book Store"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subtitle / Short Tagline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Health & Tests, Veterinary, Stationery"
                  value={categoryForm.subtitle}
                  onChange={(e) => setCategoryForm({ ...categoryForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Emoji / Icon</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 🧪, 🐶, 🩺, 📚"
                  value={categoryForm.emoji}
                  onChange={(e) => setCategoryForm({ ...categoryForm, emoji: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCategoryModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 rounded-xl transition shadow"
                >
                  Create Category Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT CATEGORY MODAL */}
      {isEditCategoryModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-amber-50">
              <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
                <Edit size={18} className="text-amber-600" /> Edit Category Card
              </h3>
              <button onClick={() => setIsEditCategoryModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditCategorySubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Category Title</label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Subtitle</label>
                <input
                  type="text"
                  required
                  value={categoryForm.subtitle}
                  onChange={(e) => setCategoryForm({ ...categoryForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Emoji Icon</label>
                <input
                  type="text"
                  required
                  value={categoryForm.emoji}
                  onChange={(e) => setCategoryForm({ ...categoryForm, emoji: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-lg"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditCategoryModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ADD ITEM INSIDE SECTION MODAL */}
      {isAddItemModalOpen && selectedCategory && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-amber-50">
              <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
                <Plus size={18} className="text-amber-600" /> Add Item / Service to {selectedCategory.name}
              </h3>
              <button onClick={() => setIsAddItemModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddItemSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Item / Service Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Special Herbal Tea / Oxygen Ambulance / Consultation"
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    placeholder="150"
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit / Measurement</label>
                  <input
                    type="text"
                    required
                    placeholder="per kg / 1 cup / per trip"
                    value={itemForm.unit}
                    onChange={(e) => setItemForm({ ...itemForm, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Vendor / Store Owner</label>
                <input
                  type="text"
                  required
                  placeholder="Vendor name providing this item"
                  value={itemForm.vendor}
                  onChange={(e) => setItemForm({ ...itemForm, vendor: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddItemModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition shadow"
                >
                  Add Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT ITEM MODAL */}
      {isEditItemModalOpen && selectedCategory && selectedItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-amber-50">
              <h3 className="font-bold text-amber-950 text-base flex items-center gap-2">
                <Edit size={18} className="text-amber-600" /> Edit Item Details
              </h3>
              <button onClick={() => setIsEditItemModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditItemSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Item Name</label>
                <input
                  type="text"
                  required
                  value={itemForm.name}
                  onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price (₹)</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Unit</label>
                  <input
                    type="text"
                    required
                    value={itemForm.unit}
                    onChange={(e) => setItemForm({ ...itemForm, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Vendor Provider</label>
                <input
                  type="text"
                  required
                  value={itemForm.vendor}
                  onChange={(e) => setItemForm({ ...itemForm, vendor: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditItemModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-amber-500 hover:bg-amber-600 rounded-xl transition shadow"
                >
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default VendorManagementTab;
