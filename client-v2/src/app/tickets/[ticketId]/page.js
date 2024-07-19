// /pages/tickets/[ticketId].js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useRequest from "../../hooks/use-request";

const TicketShow = ({ params }) => {
  const Router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: params.ticketId,
    },
    onSuccess: (order) =>{
      console.log('from ticket',order);
      Router.push(`/orders/${order.id}`)},
  });

  // State to hold ticket data
  const [ticketData, setTicketData] = useState(null);

  // Fetch ticket data on component mount
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await fetch(`/api/tickets/${params.ticketId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch ticket");
        }
        const data = await response.json();
        setTicketData(data);
      } catch (error) {
        console.error("Error fetching ticket:", error.message);
      }
    };
    fetchTicket();
  }, [params.ticketId]); // Dependency array ensures fetch runs only when ticket.id changes

  return (
    <div>
      <h1>Title: {ticketData?.title}</h1>
      <h4>Price: {ticketData?.price}</h4>
      {errors}
      <button onClick={() => doRequest()} className="btn btn-primary">
        Purchase
      </button>
    </div>
  );
};

export default TicketShow;
