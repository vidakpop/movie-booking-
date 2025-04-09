import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Function to generate a random receipt number: T + 5 numbers + 5 letters
const generateReceiptNumber = () => {
  const numbers = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
  const letters = Array.from({ length: 5 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join('');
  return `T${numbers}${letters}`;
};

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    email,
    phoneNumber,
    selectedSeats = [],
    movieId,
    checkout_request_id,
    booking_id
  } = location.state || {};

  const [loading, setLoading] = useState(true);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [receiptNumber, setReceiptNumber] = useState(null);
  const [movieTitle, setMovieTitle] = useState("");
  const [moviePrice, setMoviePrice] = useState(0);
  const [popupMessage, setPopupMessage] = useState("⌛ Processing payment... Please wait.");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/movies/${movieId}/`);
        const { title, price } = response.data;
        setMovieTitle(title || "Untitled");
        setMoviePrice(price || 0);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setMovieTitle("Unknown Movie");
        setMoviePrice(0);
      }
    };

    const updateBookingStatus = async () => {
      const receipt = generateReceiptNumber();
      setReceiptNumber(receipt);

      try {
        const response = await axios.post('http://127.0.0.1:8000/api/update-booking/', {
          booking_id,
          status: 'booked',
          receipt_number: receipt,
        });

        if (response.status === 200) {
          setPaymentSuccess(true);
          setPopupMessage('✅ Payment Successful!');
        } else {
          setErrorMessage('Failed to update booking status.');
        }
      } catch (error) {
        console.error('Error updating booking status:', error);
        setErrorMessage('An error occurred while updating booking status.');
      } finally {
        setLoading(false);
      }
    };

    if (movieId && booking_id) {
      fetchMovieDetails().then(updateBookingStatus);
    } else {
      setErrorMessage("Missing movie or booking info.");
      setLoading(false);
    }
  }, [movieId, booking_id]);

  const handleDownloadTicket = () => {
    window.open(`http://127.0.0.1:8000/api/generate-ticket/${booking_id}/`, '_blank');
  };

  const totalPaid = selectedSeats.length * moviePrice;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 relative">
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg shadow-lg text-center max-w-md w-full animate-pulse">
            <p className="text-lg font-semibold mb-2">{popupMessage}</p>
            <div className="mt-4">
              <svg className="animate-spin h-12 w-12 text-yellow-600 mx-auto" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            </div>
            <p className="text-sm text-yellow-400 mt-4">We are almost there... Hold tight!</p>
          </div>
        </div>
      )}

      {!loading && paymentSuccess && (
        <div className="text-center bg-white text-black p-6 rounded-xl shadow-xl max-w-lg w-full animate-bounce">
          <h1 className="text-4xl font-bold text-green-600 mb-4">✅ Payment Successful!</h1>
          <p className="text-lg mb-2">🎬 Movie: <strong>{movieTitle}</strong></p>
          <p className="text-lg mb-2">Seats: <strong>{selectedSeats.join(', ')}</strong></p>
          <p className="mb-2">💰 Total Paid: <strong>KES {totalPaid}</strong></p>
          {receiptNumber && (
            <p className="text-sm text-gray-600 mt-4">📄 Receipt: <strong>{receiptNumber}</strong></p>
          )}

          <div className="mt-6">
            <button
              onClick={handleDownloadTicket}
              className="inline-block bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-full shadow-lg transform transition-all hover:scale-105"
            >
              🎟️ Download Your Ticket
            </button>
          </div>

          <button
            onClick={() => navigate('/')}
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all transform hover:scale-105"
          >
            Go to Home
          </button>
        </div>
      )}

      {!loading && !paymentSuccess && (
        <div className="text-center text-red-400">
          <p className="text-lg mb-2">❌ {errorMessage || "Payment failed or timed out."}</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded-lg"
          >
            Retry Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default Confirmation;
