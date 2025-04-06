import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!checkout_request_id) {
      alert("No payment request found.");
      navigate('/payment', { state: location.state });
      return;
    }
  
    const checkPaymentStatus = async (retries = 5) => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/payment/status/", {
          checkout_request_id
        });
  
        if (response.data.status === "success") {
          setPaymentSuccess(true);
          setReceiptNumber(response.data.mpesa_receipt_number);
          await axios.post("http://127.0.0.1:8000/api/release-seats/", { booking_id });
          generatePdf(response.data.mpesa_receipt_number);
          setLoading(false);
        } else if (retries > 0 && response.data.status === "processing") {
          // Wait and retry
          setTimeout(() => checkPaymentStatus(retries - 1), 5000); // retry every 5 seconds
        } else {
          alert("Payment was not successful. Please try again.");
          navigate('/payment', { state: location.state });
        }
      } catch (error) {
        alert("Something went wrong while confirming your payment.");
        navigate('/payment', { state: location.state });
      }
    };
  
    checkPaymentStatus(); // Call initial
  }, [checkout_request_id, navigate]);
  

  const generatePdf = (receipt) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("🎟️ Movie Ticket Confirmation", 20, 20);

    doc.setFontSize(12);
    doc.autoTable({
      startY: 30,
      head: [['Field', 'Details']],
      body: [
        ['Name/Email', email],
        ['Phone Number', phoneNumber],
        ['Movie ID', movieId],
        ['Cinema ID', cinemaId],
        ['Seats Booked', selectedSeats.join(', ')],
        ['Total Amount', `KES ${moviePrice * selectedSeats.length}`],
        ['M-Pesa Receipt', receipt],
      ],
    });

    const pdfBlob = doc.output('blob');
    const pdfURL = URL.createObjectURL(pdfBlob);
    setPdfUrl(pdfURL);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
      {loading ? (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-2">Processing Payment...</h2>
            <p>Please wait while we confirm your payment with M-Pesa.</p>
            <div className="mt-4 border-t-4 border-green-500 w-12 h-12 mx-auto animate-spin rounded-full" />
          </div>
        </div>
      ) : paymentSuccess ? (
        <div className="text-center bg-green-800 p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-bold text-green-300 mb-4">🎉 Payment Successful!</h1>
          <p className="mb-2">Your booking is confirmed.</p>
          <p className="mb-2">Seats: <strong>{selectedSeats.join(', ')}</strong></p>
          <p className="mb-2">Amount Paid: KES <strong>{moviePrice * selectedSeats.length}</strong></p>
          <p className="mb-2">Receipt: <strong>{receiptNumber}</strong></p>

          {pdfUrl && (
            <a
              href={pdfUrl}
              download="movie_ticket.pdf"
              className="mt-4 inline-block bg-white text-green-800 px-4 py-2 rounded hover:bg-gray-200 transition"
            >
              📄 Download Ticket (PDF)
            </a>
          )}
        </div>
      ) : (
        <p className="text-lg">Something went wrong. Redirecting you back to payment...</p>
      )}
    </div>
  );
};

export default Confirmation;
