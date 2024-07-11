// /app/page.js
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    const getTickets = async () => {
      const res = await fetch("/api/tickets");
      const tickets = await res.json();
      setTickets(tickets);
    };
    getTickets();
  }, []);

  const ticketList = tickets.map((ticket) => (
    <tr key={ticket.id}>
      <td>{ticket.title}</td>
      <td>{ticket.price}</td>
      <td>
        <Link href={`/tickets/${ticket.id}`}>View</Link>
      </td>
    </tr>
  ));

  return (
    <div>
      <h1>Tickets</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{ticketList}</tbody>
      </table>
    </div>
  );
};

export default LandingPage;
