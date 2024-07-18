'use client'
import { useEffect, useState } from "react";
import StripeCheckout from "react-stripe-checkout";
import { useRouter } from "next/navigation";
import useRequest from "../../hooks/use-request";
import { useUser } from "../../context/userContext";

const OrderShow = ({ params }) => {
  const [order, setOrder] = useState(null);
  console.log('from orders',order);
  const [timeLeft, setTimeLeft] = useState(0);
  const router = useRouter();
  const { currentUser } = useUser();
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order?.id,
    },
    onSuccess: () => router.push("/orders"),
  });

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`/api/orders/${params.orderId}`);
        const orderData = await res.json();
        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching order:", error.message);
      }
    };

    if (!order) {
      fetchOrder();
    }
  }, [params.orderId]);

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order?.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);


  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return (
    <div>
      <h1>Ticket title: {order?.ticket.title}</h1>
      <h2>Ticket Price: {order?.ticket.price}</h2>
      <p>Time left to pay: {timeLeft} seconds</p>
      <StripeCheckout
        token={({id}) => doRequest({token: id })}
        stripeKey="pk_test_51PQnGwP1lPZGms1lJeVXGaUbsH3sQAhJIbWjjFtp7HTkoYipOWRyZzanElUBYPBZP0oGmaaXMOpVLjAwGQKtcJqq00GtBJqRQN" // Replace with your actual Stripe publishable key
        amount={order?.ticket?.price * 100}
        email={currentUser?.email}
      />
      {errors}
    </div>
  );
};

export default OrderShow;