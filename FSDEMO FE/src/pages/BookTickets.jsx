import React from "react";
import { useLoaderData, useNavigate } from "react-router";
import { toast } from "react-toastify";
import instance from "../services/instance"; // Axios instance for API calls
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/auth/userSlice";
import { selectEmail } from "../../redux/features/auth/userSlice";

const BookTickets = () => {
  const event = useLoaderData(); // Get event data from loader
  const navigate = useNavigate();
  const userId = useSelector(selectUser);
  const email = useSelector(selectEmail);
  console.log(email);
  const [selectedTicketType, setSelectedTicketType] = React.useState("");
  const [ticketPrice, setTicketPrice] = React.useState(0);

  // Load the Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      // Check if Razorpay script already exists in the document
      if (document.getElementById("razorpay-script")) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.id = "razorpay-script";
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    });
  };

  // Handle ticket selection and update state accordingly
  const handleTicketSelection = (type, price) => {
    setSelectedTicketType(type);
    setTicketPrice(price);
  };

  // Handle payment initiation
  const handlePayment = async () => {
    try {
      await loadRazorpayScript(); // Dynamically load the Razorpay script

      const payload = {
        email,
        ticketPrice,
        eventId: event._id, // Use the event's ID for creating the order
      };

      console.log("Payload Sent to Backend:", payload);

      const { data } = await instance.post("/payment/create-order", payload);

      // Razorpay options
      const options = {
        key: "rzp_test_0QAv4y6exGUgyN", // Replace with your Razorpay test/live key
        amount: ticketPrice * 100, // Convert to paise
        currency: "INR",
        name: "Event Booking",
        description: `Purchase ${selectedTicketType} Ticket`,
        order_id: data.orderId, // Razorpay order ID
        handler: async (response) => {
          await handlePaymentSuccess(response); // Handle payment success
        },
        theme: { color: "#3399cc" },
      };

      // Open the Razorpay payment modal
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Error loading Razorpay payment gateway");
      }
      console.error("Error loading Razorpay:", error);
    }
  };

  // Handle successful payment
  const handlePaymentSuccess = async (response) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        response;

      if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        throw new Error("Missing payment, order, or signature from Razorpay");
      }

      // Send payment details to the backend for ticket creation
      await instance.post(
        "/payment/payment-success",
        {
          eventId: event._id,
          userId,
          email,
          ticketType: selectedTicketType,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          signature: razorpay_signature,
        },
        {
          timeout: 10000,
        }
      );

      toast.success("Payment successful! Check your tickets.");
      navigate("/payment-success"); // Redirect to success page
    } catch (error) {
      toast.error("Payment was successful but ticket booking failed.");
      console.error("Error handling payment success:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      <h2 className="text-lg mb-2">Select Ticket Type:</h2>

      {/* Render available ticket types */}
      {Object.entries(event.ticketPrices || {}).map(([ticketType, price]) => (
        <div
          key={ticketType}
          className={`flex justify-between p-2 border ${
            selectedTicketType === ticketType ? "bg-blue-100" : ""
          }`}
          onClick={() => handleTicketSelection(ticketType, price)}
        >
          <span className="font-bold">{ticketType.toUpperCase()} Ticket</span>
          <span>₹{price}</span>
        </div>
      ))}

      {/* Display the selected ticket type and price */}
      {selectedTicketType && (
        <div className="mt-4">
          <h2 className="text-xl">Selected: {selectedTicketType} Ticket</h2>
          <button
            onClick={handlePayment}
            className="bg-green-500 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-600"
          >
            Pay ₹{ticketPrice}
          </button>
        </div>
      )}
    </div>
  );
};

export default BookTickets;
