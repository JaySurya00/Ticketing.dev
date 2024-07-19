'use client'

import { useEffect, useState } from "react";

const OrderIndex = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await fetch('/api/orders');
      const data = await res.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  if(orders.length===0){
    return <p>You don't have any order!!</p>
  }

  return (
    <ul>
      {orders.map((order) => (
        <li key={order.id}>
          {order.ticket.title} - {order.status}
        </li>
      ))}
    </ul>
  );
};

export default OrderIndex;
