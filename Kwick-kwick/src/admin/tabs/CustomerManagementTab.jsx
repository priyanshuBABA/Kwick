import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Users, Plus, Search, Edit, Trash2, ShieldAlert, ShieldCheck, Wallet, Phone, Mail, X, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const CustomerManagementTab = () => {
  const { customers, addCustomer, updateCustomer, deleteCustomer, toggleCustomerStatus, adjustCustomerWallet } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    walletBalance: 0
  });

  const [walletAmount, setWalletAmount] = useState('');
  const [walletAction, setWalletAction] = useState('add'); // 'add' or 'subtract'

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.phone.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setFormData({ name: '', phone: '', email: '', walletBalance: 0 });
    setIsAddModalOpen(false);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (cust) => {
    setSelectedCustomer(cust);
    setFormData({
      name: cust.name,
      phone: cust.phone,
      email: cust.email,
      walletBalance: cust.walletBalance
    });
    setIsEditModalOpen(true);
  };

  const handleOpenWalletModal = (cust) => {
    setSelectedCustomer(cust);
    setWalletAmount('');
    setWalletAction('add');
    setIsWalletModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addCustomer(formData);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedCustomer) {
      updateCustomer(selectedCustomer.id, formData);
      setIsEditModalOpen(false);
    }
  };

  const handleWalletSubmit = (e) => {
    e.preventDefault();
    if (selectedCustomer && walletAmount) {
      const delta = walletAction === 'add' ? Number(walletAmount) : -Number(walletAmount);
      adjustCustomerWallet(selectedCustomer.id, delta);
      setIsWalletModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Users className="text-emerald-600" /> Customer Section Management
          </h2>
          <p className="text-xs text-slate-500 font-medium">Manage user profiles, adjust wallet balances/refunds, inspect bookings & handle account bans.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
        >
          <Plus size={16} /> Register New Customer
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search customer by name, phone number, or email address..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Customer Details</th>
                <th className="py-3.5 px-4">Contact Details</th>
                <th className="py-3.5 px-4">Wallet Balance</th>
                <th className="py-3.5 px-4">Total Orders</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400 font-medium">
                    No customers found matching your search.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((cust) => (
                  <tr key={cust.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{cust.name}</div>
                      <div className="text-[11px] text-slate-400">ID: {cust.id} • Joined {cust.joinedDate}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800 flex items-center gap-1">
                        <Phone size={11} className="text-slate-400" /> {cust.phone}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Mail size={11} className="text-slate-400" /> {cust.email}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-emerald-600 text-sm">₹{cust.walletBalance}</span>
                        <button
                          onClick={() => handleOpenWalletModal(cust)}
                          className="p-1 hover:bg-emerald-50 text-emerald-600 rounded-lg transition"
                          title="Adjust Customer Wallet"
                        >
                          <Wallet size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-800">
                      {cust.totalOrders} rides / orders
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleCustomerStatus(cust.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                          cust.status === 'Active'
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                        }`}
                      >
                        {cust.status === 'Active' ? <ShieldCheck size={11} /> : <ShieldAlert size={11} />}
                        {cust.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(cust)}
                          title="Edit Customer Info"
                          className="p-1.5 hover:bg-emerald-50 text-emerald-600 rounded-lg transition"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete customer "${cust.name}" permanently?`)) {
                              deleteCustomer(cust.id);
                            }
                          }}
                          title="Delete Customer Account"
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

      {/* Add Customer Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Users size={18} className="text-emerald-600" /> Register Customer
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="+91 98000 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Initial Wallet Credit (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.walletBalance}
                    onChange={(e) => setFormData({ ...formData, walletBalance: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="rahul@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow"
                >
                  Add Customer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Customer Modal */}
      {isEditModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Edit size={18} className="text-emerald-600" /> Edit Customer Profile
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow"
                >
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Adjust Wallet Modal */}
      {isWalletModalOpen && selectedCustomer && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Wallet size={18} className="text-emerald-600" /> Adjust Wallet Balance
              </h3>
              <button onClick={() => setIsWalletModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleWalletSubmit} className="p-6 space-y-4 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200/60 rounded-xl text-center">
                <p className="text-[11px] text-emerald-800 font-medium">Current Balance for {selectedCustomer.name}</p>
                <p className="text-2xl font-black text-emerald-900">₹{selectedCustomer.walletBalance}</p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setWalletAction('add')}
                  className={`flex-1 py-2 font-bold rounded-xl border transition flex items-center justify-center gap-1 ${
                    walletAction === 'add'
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <ArrowUpRight size={14} /> Add Credit
                </button>
                <button
                  type="button"
                  onClick={() => setWalletAction('subtract')}
                  className={`flex-1 py-2 font-bold rounded-xl border transition flex items-center justify-center gap-1 ${
                    walletAction === 'subtract'
                      ? 'bg-rose-600 text-white border-rose-600 shadow'
                      : 'bg-white text-slate-700 border-slate-200'
                  }`}
                >
                  <ArrowDownRight size={14} /> Deduct
                </button>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Amount (₹)</label>
                <input
                  type="number"
                  required
                  min="1"
                  placeholder="Enter amount..."
                  value={walletAmount}
                  onChange={(e) => setWalletAmount(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-bold text-sm"
                />
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWalletModalOpen(false)}
                  className="px-4 py-2 font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow"
                >
                  Apply Adjustment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagementTab;
