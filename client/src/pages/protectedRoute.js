"use client"; // Ensure it runs on the client side

import React, { useContext, useEffect, useState } from "react";
import ConnectWalletModal from "@/components/ConnectWalletModal";
import { useRouter } from "next/router";
import { NearContext } from "../wallets/near";

const ProtectedRoute = ({ children }) => {
  const { wallet, signedAccountId } = useContext(NearContext);
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(!!wallet);

  useEffect(() => {
    setIsClient(true);
    if (!wallet) {
      router.push("/"); // Redirect to home if no wallet connected
    } else {
      setIsWalletConnected(true);
    }
  }, [wallet, router]);

  if (!isClient) return null;

  if (signedAccountId == "") {
    return <ConnectWalletModal router={router} />;
  }

  return children;
};

export default ProtectedRoute;
