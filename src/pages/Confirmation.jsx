import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    email,
    phoneNumber,
    selectedSeats,
    moviePrice,
    movieId,
    cinemaId,
    checkout_request_id,
    booking_id
  } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState(null);

  useEffect(() => {
    if (!checkout_request_id) {
      alert("No payment request found.");
      navigate('/payment', { state: location.state });
      return;
    }

    const checkPaymentStatus = async () => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/payment/status/", {
          checkout_request_id
        });

        if (response.data.status === "success") {
          setPaymentSuccess(true);
          setReceiptNumber(response.data.mpesa_receipt_number);
        } else {
          alert("Payment was not successful. Please try again.");
          navigate('/payment', { state: location.state });
        }
      } catch (error) {
        alert("Something went wrong while confirming your payment.");
        navigate('/payment', { state: location.state });
      } finally {
        setLoading(false);
      }
    };

    checkPaymentStatus();
  }, [checkout_request_id, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <p>Checking payment status...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-green-900 text-white flex flex-col items-center justify-center p-6">
      {paymentSuccess ? (
        <>
          <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
          <p className="text-lg mb-2">Your booking is confirmed for seats: {selectedSeats?.join(', ')}</p>
          <p className="mb-2">Movie ID: {movieId}</p>
          <p className="mb-2">Total Paid: KES {moviePrice * selectedSeats.length}</p>
          {receiptNumber && <p className="text-sm mt-4">Receipt Number: {receiptNumber}</p>}
        </>
      ) : (
        <p className="text-lg">Something went wrong. Redirecting you back to payment...</p>
      )}
    </div>
  );
};

export default Confirmation;
