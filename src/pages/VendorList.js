import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import VendorCard from '../components/VendorCard';
import { fetchVendorsSuccess } from '../redux/vendorSlice';

const VendorList = () => {
  const dispatch = useDispatch();
  const { vendors, loading, error } = useSelector((state) => state.vendor);

  useEffect(() => {
    dispatch(fetchVendorsSuccess([
      { id: 1, name: 'Vendor 1', email: 'vendor1@example.com' },
      { id: 2, name: 'Vendor 2', email: 'vendor2@example.com' },
    ]));
  }, [dispatch]);

  if (loading) {
    return <div>Loading vendors...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Vendor List</h2>
      {vendors.map(vendor => (
        <VendorCard key={vendor.id} vendor={vendor} />
      ))}
    </div>
  );
};

export default VendorList;