import React, { useContext } from "react";

import ConnectWalletModal from "./components/ConnectWalletModal.jsx";
import { useNavigate } from "react-router-dom"; // import your modal component
import { NearContext } from "./wallets/near.js";


const ProtectedRoute = ({ children }) => {
  const { wallet } = useContext(NearContext);

  const navigate = useNavigate();

  if (!wallet) {
    return <ConnectWalletModal navigate={navigate} />; // Display modal instead of navigating away
  }

  return children;
};

export default ProtectedRoute;
