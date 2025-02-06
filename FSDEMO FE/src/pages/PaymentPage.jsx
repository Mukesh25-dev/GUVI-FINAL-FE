import React from "react";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import instance from "../services/instance";
import { selectEmail } from "../../redux/features/auth/userSlice";

const PaymentPage = ({ ticketPrice, eventId, userId, selectedTicketType }) => {
  const email = useSelector(selectEmail);
  const navigate = useNavigate();

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    try {
      await loadRazorpayScript();

      const { data } = await instance.post("/payment/create-order", {
        email,
        ticketPrice,
        eventId,
      });

      const options = {
        key: "rzp_test_0QAv4y6exGUgyN",
        amount: ticketPrice * 100,
        currency: "INR",
        name: "Event Booking",
        description: `Purchase ${selectedTicketType} Ticket`,
        order_id: data.orderId,
        handler: async (response) => {
          await handlePaymentSuccess(response);
        },
        theme: { color: "#3399cc" },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error("Error loading Razorpay payment gateway");
      console.error("Payment error:", error);
    }
  };

  const handlePaymentSuccess = async (response) => {
    try {
      const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
        response;

      if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature) {
        throw new Error("Missing payment, order, or signature from Razorpay");
      }

      // Log data being sent to backend for debugging
      console.log("Sending payment success to backend:", {
        eventId,
        userId,
        email,
        ticketType: selectedTicketType,
        paymentId: razorpay_payment_id,
        orderId: razorpay_order_id,
        signature: razorpay_signature,
      });

      // Send payment success details to backend
      const paymentResponse = await instance.post(
        "/payment/payment-success",
        {
          eventId,
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

      // Log response data from backend for debugging
      console.log("Payment success API response:", paymentResponse);

      if (paymentResponse.status === 200) {
        toast.success(paymentResponse.data?.message || "Payment successful!");
        navigate("/payment-success", {
          state: {
            paymentId: razorpay_payment_id,
            orderId: razorpay_order_id,
          },
        });
      } else {
        // Handle backend errors properly
        toast.error(paymentResponse.data?.message || "Ticket creation failed.");
      }
    } catch (error) {
      console.error("Error during payment success handling:", error);
      console.error("Error response data:", error.response?.data);

      // Show an error toast if something went wrong
      toast.error(
        error.response?.data?.message ||
          "Payment was successful but ticket creation failed."
      );
    }
  };
};

export default PaymentPage;
