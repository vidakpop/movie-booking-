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
  const [ticketUrl, setTicketUrl] = useState("");

  useEffect(() => {
    if (!checkout_request_id) {
      alert("No payment request found.");
      navigate('/payment', { state: location.state });
      return;
    }

    const checkPaymentStatus = async (retries = 8) => {
      try {
        setPopupMessage("⌛ Confirming your payment...");
        const response = await axios.post("http://127.0.0.1:8000/api/payment/status/", {
          checkout_request_id,
        });

        const data = response.data;
        const { status, message, mpesa_receipt_number } = data;

        setPopupMessage(message);

        if (status === "success") {
          setPaymentSuccess(true);
          setReceiptNumber(mpesa_receipt_number || "N/A");

          // Update booking as successful in backend
          const updateResponse = await axios.post("http://127.0.0.1:8000/api/update-payment/", {
            booking_id,
            status: 'success',
            mpesa_receipt_number: mpesa_receipt_number,
          });

          // Release seats
          if (booking_id) {
            await axios.post("http://127.0.0.1:8000/api/release-seats/", { booking_id });
          }

          // Optional: Generate or fetch ticket URL from backend
          const ticketResponse = await axios.get(`http://127.0.0.1:8000/api/download-ticket/${booking_id}/`);
          setTicketUrl(ticketResponse.data.ticket_url);

          setLoading(false);
        } else if (status === "failed") {
          setErrorMessage("❌ " + message);
          setLoading(false);
          setTimeout(() => navigate('/payment', { state: location.state }), 5000);
        } else if (status === "pending" && retries > 0) {
          setTimeout(() => checkPaymentStatus(retries - 1), 10000);
        } else {
          setPopupMessage("⚠️ Payment is still processing. Try again later.");
          setErrorMessage("Payment timeout.");
          setLoading(false);
          setTimeout(() => navigate('/payment', { state: location.state }), 5000);
        }

      } catch (error) {
        console.error("❌ Error checking payment:", error);
        setPopupMessage("❌ An error occurred while checking payment.");
        setErrorMessage(error.response?.data?.message || error.message);
        setLoading(false);
        setTimeout(() => navigate('/payment', { state: location.state }), 5000);
      }
    };

    checkPaymentStatus();
  }, [checkout_request_id, navigate]);

  const handleDownloadTicket = () => {
    if (ticketUrl) {
      window.open(ticketUrl, "_blank");
    }
  };

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
            {errorMessage && <p className="text-red-600 text-sm mt-4">{errorMessage}</p>}
          </div>
        </div>
      )}

      {!loading && paymentSuccess && (
        <div className="text-center bg-white text-black p-6 rounded-xl shadow-xl max-w-lg w-full">
          <h1 className="text-3xl font-bold mb-4">✅ Payment Successful!</h1>
          <p className="text-lg mb-2">Booking confirmed for seats: <strong>{selectedSeats?.join(', ')}</strong></p>
          <p className="mb-2">🎬 Movie ID: {movieId}</p>
          <p className="mb-2">💰 Total Paid: <strong>KES {moviePrice * selectedSeats.length}</strong></p>
          {receiptNumber && <p className="text-sm mt-4">📄 Receipt: <strong>{receiptNumber}</strong></p>}

          {ticketUrl && (
            <button
              onClick={handleDownloadTicket}
              className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
            >
              🎟️ Download Ticket
            </button>
          )}

          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition ml-2"
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
