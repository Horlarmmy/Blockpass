import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { NearContext } from "@/wallets/near";
import Image from "next/image";
import logo from "../../assets/logos/logo.png";
import Link from "next/link";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signedAccountId, wallet } = useContext(NearContext);
  const router = useRouter();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleConnect = () => {
    if (!signedAccountId) wallet?.signIn();
  };

  const handleDisconnect = () => {
    if (signedAccountId) wallet?.signOut();
  };

  const isWalletConnected = !!signedAccountId;


  return (
    <nav className="container  flex justify-between items-center mx-auto px-8 py-4 lg:relative">
      {/* Logo and Brand Name */}
      <Link href="/" passHref>
        <motion.div
          whileHover={{ scale: 1.1 }}
          
          className="flex items-center cursor-pointer"
        >
          <Image src={logo} alt="BlockPass Logo" className="h-8 mr-2" />
          <span className="text-white font-semibold text-lg">BlockPass</span>
        </motion.div>
      </Link>

      {/* Hamburger Button */}
      <button
        className="md:hidden text-white hover:text-[#F5167E] focus:outline-none"
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
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:flex md:items-center md:space-x-6 absolute md:static top-16 left-0 w-full md:w-auto bg-black/30 md:bg-transparent p-4 md:p-0 z-10`}
      >
        <Link
          href="/create"
          passHref
          className="block md:inline-block text-white hover:text-[#F5167E] transition-colors duration-200 py-2 md:py-0"
          onClick={toggleMenu}
        >
          Create
        </Link>
        <Link
          href="/events"
          passHref
          className="block md:inline-block text-white hover:text-[#F5167E] transition-colors duration-200 py-2 md:py-0"
          onClick={toggleMenu}
        >
          All Events
        </Link>
        <Link
          href="/my-tickets"
          passHref
          className="block md:inline-block text-white hover:text-[#F5167E] transition-colors duration-200 py-2 md:py-0"
          onClick={toggleMenu}
        >
          My Tickets
        </Link>

        {/* Wallet Buttons */}
        {isWalletConnected ? (
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white px-4 py-2 rounded-full transition-colors duration-200 bg-red-600/30 hover:bg-red-700 ring-2 ring-white ring-opacity-50 hover:ring-opacity-75 ml-4"
            onClick={handleDisconnect}
          >
            Disconnect 💳
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="text-white px-4 py-2 rounded-full transition-colors duration-200 ring-2 ring-white ring-opacity-50 hover:ring-opacity-75 bg-purple-800/30 hover:bg-purple-900"
            onClick={handleConnect}
          >
            Connect Wallet
          </motion.button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
