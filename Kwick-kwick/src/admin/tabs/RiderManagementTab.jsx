import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Car, Plus, Search, Edit, Trash2, Power, Star, Phone, ShieldCheck, ShieldAlert, Navigation, X } from 'lucide-react';

const RiderManagementTab = () => {
  const { riders, addRider, updateRider, deleteRider, toggleRiderDuty, toggleRiderStatus } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicleType: 'Emergency ALS Ambulance',
    plateNumber: '',
    assignedVendor: 'Munger Emergency Ambulance Care'
  });

  const vehicleOptions = [
    'Emergency ALS Ambulance',
    'Basic Life Support (BLS)',
    'Patient Transport Vehicle',
    'Delivery Bike',
    'QuickMart Delivery Auto'
  ];

  const filteredRiders = riders.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.phone.includes(searchTerm) ||
    r.plateNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.vehicleType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      phone: '',
      vehicleType: 'Emergency ALS Ambulance',
      plateNumber: '',
      assignedVendor: 'Munger Emergency Ambulance Care'
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (rider) => {
    setSelectedRider(rider);
    setFormData({
      name: rider.name,
      phone: rider.phone,
      vehicleType: rider.vehicleType,
      plateNumber: rider.plateNumber,
      assignedVendor: rider.assignedVendor
    });
    setIsEditModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addRider(formData);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedRider) {
      updateRider(selectedRider.id, formData);
      setIsEditModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <Car className="text-purple-600" /> Rider & Ambulance Fleet Management
          </h2>
          <p className="text-xs text-slate-500 font-medium">Control emergency ambulance drivers, delivery riders, live duty status & vehicle assignments.</p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow transition"
        >
          <Plus size={16} /> Register New Rider / Driver
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative">
          <Search size={18} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Search rider name, license plate, vehicle type, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
          />
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 px-4">Rider Details</th>
                <th className="py-3.5 px-4">Vehicle & License Plate</th>
                <th className="py-3.5 px-4">Duty Status</th>
                <th className="py-3.5 px-4">Rating & Trips</th>
                <th className="py-3.5 px-4">Account Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {filteredRiders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-slate-400 font-medium">
                    No riders found matching your search.
                  </td>
                </tr>
              ) : (
                filteredRiders.map((rider) => (
                  <tr key={rider.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{rider.name}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Phone size={10} /> {rider.phone}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-purple-900">{rider.vehicleType}</div>
                      <div className="text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md inline-block mt-0.5">
                        {rider.plateNumber}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleRiderDuty(rider.id)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold shadow-sm transition ${
                          rider.dutyStatus === 'Online'
                            ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                            : rider.dutyStatus === 'On Trip'
                            ? 'bg-amber-500 text-white hover:bg-amber-600'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        <Navigation size={11} className={rider.dutyStatus === 'Online' ? 'animate-pulse' : ''} />
                        {rider.dutyStatus}
                      </button>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1 font-bold text-amber-500">
                        <Star size={12} fill="currentColor" /> {rider.rating}
                      </div>
                      <div className="text-[11px] text-slate-400">{rider.trips} completed trips</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleRiderStatus(rider.id)}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition ${
                          rider.status === 'Active'
                            ? 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                            : 'bg-rose-100 text-rose-700 hover:bg-rose-200'
                        }`}
                      >
                        <Power size={11} /> {rider.status}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEditModal(rider)}
                          title="Edit Rider & Vehicle"
                          className="p-1.5 hover:bg-purple-50 text-purple-600 rounded-lg transition"
                        >
                          <Edit size={15} />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete rider "${rider.name}" permanently?`)) {
                              deleteRider(rider.id);
                            }
                          }}
                          title="Delete Rider"
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

      {/* Add Rider Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Car size={18} className="text-purple-600" /> Onboard New Driver / Rider
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Driver Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vehicle Category</label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-medium"
                  >
                    {vehicleOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">License Plate Number</label>
                  <input
                    type="text"
                    required
                    placeholder="BR 01 AB 9999"
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
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
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Vendor / Fleet</label>
                  <input
                    type="text"
                    required
                    placeholder="Munger Emergency Ambulance Care"
                    value={formData.assignedVendor}
                    onChange={(e) => setFormData({ ...formData, assignedVendor: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
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
                  className="px-4 py-2 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition shadow"
                >
                  Create Rider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Rider Modal */}
      {isEditModalOpen && selectedRider && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-150">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-base flex items-center gap-2">
                <Edit size={18} className="text-purple-600" /> Edit Rider Profile
              </h3>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleEditSubmit} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Driver Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Vehicle Category</label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 font-medium"
                  >
                    {vehicleOptions.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">License Plate Number</label>
                  <input
                    type="text"
                    required
                    value={formData.plateNumber}
                    onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Assigned Vendor</label>
                  <input
                    type="text"
                    required
                    value={formData.assignedVendor}
                    onChange={(e) => setFormData({ ...formData, assignedVendor: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
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
                  className="px-4 py-2 font-bold text-white bg-purple-600 hover:bg-purple-700 rounded-xl transition shadow"
                >
                  Save Rider
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RiderManagementTab;
