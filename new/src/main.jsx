import React, { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { NetworkId } from './config';
import { NearContext, Wallet } from './wallets/near';
import { BrowserRouter } from 'react-router-dom';

const RootComponent = () => {
  const [signedAccountId, setSignedAccountId] = useState("");
  const wallet = new Wallet({ networkId: NetworkId });

  useEffect(() => {
    wallet.startUp(setSignedAccountId);
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <NearContext.Provider value={{ wallet, signedAccountId }}>
          <App />
        </NearContext.Provider>
      </BrowserRouter>
    </StrictMode>
  );
};

createRoot(document.getElementById('root')).render(<RootComponent />);
