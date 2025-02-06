import React from "react";
import { useLocation, useNavigate } from "react-router";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Extract payment details from the query parameters or state
  const paymentDetails = location.state || {};

  const handleBackToDashboard = () => {
    navigate("/candidate/dashboard");
  };

  return (
    <div className="p-6 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p className="mt-4 text-lg">Thank you for your payment!</p>
      {paymentDetails.orderId && (
        <p className="text-gray-600 mt-2">
          Order ID: <strong>{paymentDetails.orderId}</strong>
        </p>
      )}
      <p className="text-gray-600 mt-2">
        Your ticket will be sent to your registered email.
      </p>
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        onClick={handleBackToDashboard}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default PaymentSuccess;
