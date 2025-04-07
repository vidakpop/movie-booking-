import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    email,
    phoneNumber,
    selectedSeats = [],
    moviePrice,
    movieId,
    cinemaId,
    checkout_request_id,
    booking_id
  } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState(null);
  const [popupMessage, setPopupMessage] = useState("⌛ Processing payment. Please wait...");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!checkout_request_id) {
      alert("No payment request found.");
      navigate('/payment', { state: location.state });
      return;
    }

    const checkPaymentStatus = async (retries = 6) => {
      try {
        console.log("Checking payment status...");

        const response = await axios.post("http://127.0.0.1:8000/api/payment/status/", {
          checkout_request_id,
        });

        const data = response.data;
        console.log("Payment Status Response:", data);

        const { status, message, mpesa_receipt_number } = data;

        setPopupMessage(message);

        if (status === "success") {
          setPaymentSuccess(true);
          setReceiptNumber(mpesa_receipt_number || "N/A");

          if (booking_id) {
            await axios.post("http://127.0.0.1:8000/api/release-seats/", { booking_id });
          } else {
            console.warn("⚠️ Missing booking_id for releasing seats.");
          }

          setLoading(false);
        } else if (status === "failed") {
          setErrorMessage("❌ " + message);
          setLoading(false);
          setTimeout(() => {
            navigate('/payment', { state: location.state });
          }, 5000);
        } else if (status === "pending" && retries > 0) {
          setTimeout(() => checkPaymentStatus(retries - 1), 7000);
        } else {
          setPopupMessage("⚠️ Payment is still processing. Please try again later.");
          setErrorMessage("Payment timeout.");
          setLoading(false);
          setTimeout(() => {
            navigate('/payment', { state: location.state });
          }, 5000);
        }

      } catch (error) {
        console.error("❌ Error checking payment:", error);
        setPopupMessage("❌ An error occurred while checking payment.");
        setErrorMessage(error.response?.data?.message || error.message);
        setLoading(false);
        setTimeout(() => {
          navigate('/payment', { state: location.state });
        }, 5000);
      }
    };

    checkPaymentStatus();
  }, [checkout_request_id, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 relative">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-w-md w-full animate-pulse">
            <p className="text-lg font-semibold mb-2">{popupMessage}</p>
            <div className="mt-4">
              <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            {errorMessage && (
              <p className="text-red-600 text-sm mt-4">{errorMessage}</p>
            )}
          </div>
        </div>
      )}

      {!loading && paymentSuccess && (
        <div className="text-center bg-white text-black p-6 rounded-xl shadow-xl max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">✅ Payment Successful!</h1>
          <p className="text-lg mb-2">Booking confirmed for seats: <strong>{selectedSeats?.join(', ')}</strong></p>
          <p className="mb-2">🎬 Movie ID: {movieId}</p>
          <p className="mb-2">💰 Total Paid: <strong>KES {moviePrice * selectedSeats.length}</strong></p>
          {receiptNumber && <p className="text-sm mt-4">📄 Receipt Number: <strong>{receiptNumber}</strong></p>}

          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          >
            Go to Home
          </button>
        </div>
      )}

      {!loading && !paymentSuccess && errorMessage && (
        <p className="text-lg text-red-400">❌ Payment failed or timed out. Redirecting to payment...</p>
      )}
    </div>
  );
};

export default Confirmation;
