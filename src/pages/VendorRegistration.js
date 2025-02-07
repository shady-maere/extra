import React from 'react';
import { useDispatch } from 'react-redux';
import { registerVendor } from '../redux/vendorSlice';

const VendorRegistration = () => {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const vendorData = {
      name: event.target.vendorName.value,
      email: event.target.email.value,
      password: event.target.password.value,
    };
    dispatch(registerVendor(vendorData));
    // For now, just clear the form after submission
    event.target.reset();
  };

  return (
    <div>
      <h2>Vendor Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="vendorName">Vendor Name:</label>
          <input type="text" id="vendorName" name="vendorName" />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default VendorRegistration;