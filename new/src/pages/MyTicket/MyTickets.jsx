/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { BigNumber } from "ethers"; //

import logo from "../../assets/logos/logo.png";
import { events } from "../../data.js";
// import { useWallet } from "../../wallet-context.jsx";
import { NearContext } from "../../wallets/near.js";
// import { fetchUserTickets, getEventDetails } from "../../contractAPI";
import { events as localEvents } from "../../data.js";

const MyTickets = () => {
  const [dataEvents, setEvents] = useState(localEvents);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userTickets, setUserTickets] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const { wallet } = React.useContext(NearContext);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const loadUserTickets = async () => {
      try {
        if (!wallet) return;

        // Fetch user tickets
        // const tickets = await fetchUserTickets(wallet);
        const tickets = [];
        // Process tickets and merge with local event data
        const combinedEvents = tickets.map((ticket, index) => {
          const eventDetails = ticket.details;
          return {
            id: BigNumber.isBigNumber(ticket.eventId)
              ? ticket.eventId.toString()
              : ticket.eventId,
            title: eventDetails[0] || "Untitled Event",
            date: eventDetails[1] || "N/A",
            startTime: eventDetails[2] || "N/A",
            endTime: eventDetails[3] || "N/A",
            location: eventDetails[4] || "Location not provided",
            imageUrl:
              dataEvents[index]?.imageUrl || "/path/to/default/image.png",
            ticketsSold: BigNumber.isBigNumber(ticket.ticketsSold)
              ? ticket.ticketsSold.toString()
              : ticket.ticketsSold,
            active: ticket.active || false,
            registered: ticket.registered || false,
          };
        });

        setUserTickets(combinedEvents);
      } catch (error) {
        console.error("Failed to load user tickets or event details:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUserTickets();
  }, [wallet, dataEvents]);


  return (
    <>
      <nav className="container flex justify-between mx-auto items-center px-8 py-4">
        {/* Logo and Brand Name */}
        <Link to="/">
          <motion.div
            whileHover={{
              scale: 1.1,
            }}
            className="flex items-center"
          >
            <img src={logo} alt="BlockPass Logo" className="h-8 mr-2 " />
            <span className="text-black font-semibold text-lg">
              Block<span className="text-[#F5167E]">Pass</span>{" "}
            </span>
          </motion.div>
        </Link>
        {/* Hamburger Button */}
        <button
          className="md:hidden text-black hover:text-[#F5167E] focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-black/30 md:bg-transparent p-4 md:p-0 md:mr-16 z-10`}
        >
          {["Home", "All events", "My tickets"].map((text, index) => (
            <Link
              key={index}
              to={
                text === "All events"
                  ? "/events"
                  : `/${text.toLowerCase().replace(/\s+/g, "-")}` &&
                    text === "Home"
                  ? "/"
                  : `/${text.toLowerCase().replace(/\s+/g, "-")}` &&
                    text === "My tickets"
                  ? "/my-tickets"
                  : `/${text.toLowerCase().replace(/\s+/g, "-")}`
              }
              className="block md:inline-block text-black hover:text-[#F5167E] transition-colors duration-200 py-2 md:py-0"
            >
              {text}
            </Link>
          ))}
        </div>
      </nav>
      <div className="max-w-6xl mx-auto my-10 p-8 ">
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">MY TICKETS</h2>
        <p className="mb-4 italic text-gray-700 text-sm">
          To view NFT on other networks, switch connected network
        </p>

        {loading ? (
          <div className="flex justify-center items-center mt-5  bg-transparent">
            <p className="text-gray-500 text-2xl">Loading Tickets...</p>
          </div>
        ) : userTickets.length === 0 ? (
          <div className="flex justify-center items-center mt-5 bg-transparent">
            <p className="text-gray-500 text-2xl">No tickets available</p>
          </div>
        ) : (
          <ul role="list" >
          {userTickets.map((event) => (
            <Link key={event.id} to={`/event/${event.id}`}>
              <li className="flex justify-between gap-x-6 py-5 mb-4 bg-white shadow-md rounded-lg p-4">
                <div className="flex min-w-0 gap-x-4">
                  <img
                    alt=""
                    src={event.imageUrl}
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  />
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                      {event.title}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                      {event.location}
                    </p>
                  </div>
                </div>
                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{event.date}</p>
                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    {event.startTime} - {event.endTime}
                  </p>
                </div>
              </li>
            </Link>
          ))}
        </ul>
        
        )}
      </div>
    </>
  );
};

export default MyTickets;
