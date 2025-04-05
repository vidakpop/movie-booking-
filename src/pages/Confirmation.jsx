import React from 'react';
import { useLocation } from 'react-router-dom';

const Confirmation = () => {
  const { state } = useLocation();

  if (!state) {
    return <div className="text-center p-8 text-white">No booking found.</div>
  }

  const { email, phoneNumber, selectedSeats, moviePrice, movieId, cinemaId } = state;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">Booking Confirmed</h1>
      <p className="text-lg">Email: {email}</p>
      <p className="text-lg">Phone: {phoneNumber}</p>
      <p className="text-lg">Seats: {selectedSeats?.join(', ')}</p>
      <p className="text-lg font-bold">Amount Paid: KES {moviePrice * selectedSeats?.length}</p>
      <p className="text-green-400 mt-6">You will receive an SMS or email confirmation shortly.</p>
    </div>
  );
};

export default Confirmation;
