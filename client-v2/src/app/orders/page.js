'use client'

import { useEffect, useState } from "react";


const OrderIndex = () => {
    const [orders, setOrders]= useState([]);
    useEffect(()=>{
        const fetchOrders= async ()=>{
            const res= await fetchOrders('/api/orders');
            const data= res.json();
            setOrders(data);
        }
    },[])
    return (
      <ul>
        {orders.map((order) => {
          return (
            <li key={order.id}>
              {order.ticket.title} - {order.status}
            </li>
          );
        })}
      </ul>
    );
  };
  
  
  export default OrderIndex;
  