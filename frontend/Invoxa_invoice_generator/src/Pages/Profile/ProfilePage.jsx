import React, { useState, useEffect } from 'react';

import { useAuth } from '../../Context/AuthContext';

import {
  Loader2,
  User,
  Mail,
  Building,
  Phone,
  MapPin
} from 'lucide-react';

import axiosInstance from '../../utils/AxiosInstance';

import { API_PATHS } from '../../utils/ApiPaths';

import toast from 'react-hot-toast';

import InputField from '../../Components/Ui/InputField';

import TextareaField from '../../Components/ui/TextareaField';


const ProfilePage = () => {

  const { user, loading, updateUser } = useAuth();

  const [isUpdating, setIsUpdating] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    businessName: '',
    address: '',
    phone: '',
  });


  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        businessName: user.businessName || '',
        address: user.address || '',
        phone: user.phone || '',
      });
    }
  }, [user]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsUpdating(true);

    try {
      const response = await axiosInstance.put(
        API_PATHS.AUTH.UPDATE_PROFILE,
        formData
      );

      updateUser(response.data);

      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }


  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">

      {/* Header */}
      <div className="px-7 py-6 border-b border-slate-200">
        <h3 className="text-xl font-semibold text-slate-900">
          My Profile
        </h3>
      </div>


      <form
        onSubmit={handleUpdateProfile}
        className="px-7 py-8"
      >

        <div className="space-y-6">


          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email Address
            </label>

            <div className="relative">

              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="w-5 h-5 text-slate-400" />
              </div>

              <input
                type="email"
                readOnly
                value={user?.email || ''}
                disabled
                className="w-full h-12 pl-12 pr-4 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 focus:outline-none"
              />

            </div>
          </div>


          {/* Full Name */}
          <InputField
            label="Full Name"
            name="name"
            icon={User}
            type="text"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />


          {/* Business Information */}
          <div className="pt-6 border-t border-slate-200">

            <h4 className="text-lg font-semibold text-slate-900">
              Business Information
            </h4>

            <p className="text-sm text-slate-500 mt-1 mb-6">
              This will be used to pre-fill the "Bill From" section of your invoices.
            </p>


            <div className="space-y-5">


              {/* Business Name */}
              <InputField
                label="Business Name"
                name="businessName"
                icon={Building}
                type="text"
                value={formData.businessName}
                onChange={handleInputChange}
                placeholder="Enter your business name"
              />


              {/* Address */}
              <TextareaField
                label="Address"
                name="address"
                icon={MapPin}
                value={formData.address}
                onChange={handleInputChange}
                placeholder="123 Main St, Anytown"
              />


              {/* Phone */}
              <InputField
                label="Phone"
                name="phone"
                icon={Phone}
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="(555) 123-4567"
              />

            </div>

          </div>


          {/* Save Button */}
          <div className="flex justify-end pt-2">

            <button
              type="submit"
              disabled={isUpdating}
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-900 text-white font-medium rounded-lg hover:bg-blue-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >

              {isUpdating && (
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              )}

              {isUpdating ? 'Saving...' : 'Save Changes'}

            </button>

          </div>


        </div>

      </form>

    </div>
  );
};


export default ProfilePage;