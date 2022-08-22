import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloProvider } from "@apollo/client";

import './index.css';
import App from './App';
import Home from './pages/Home';
import Create from './pages/Create';
import Explore from './pages/Explore';
import Profile from './pages/Profile';
import SubscriptionHolder from './pages/SubscriptionHolder';
import Vendor from './pages/Vendor';
import Saas from './pages/Saas';
import DirectLicense from './pages/DirectLicense';
import { WalletProvider } from "./contexts/WalletContext";
import { client } from "./graph-ql";
import reportWebVitals from './reportWebVitals';
import SaasMintPage from './pages/SaasMintPage';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ChakraProvider>
      <WalletProvider>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<App />}>
                <Route index element={<Home />} />
                <Route path='create' element={<Create />} />
                <Route path='explore' element={<Explore />} />
                <Route path='profile' element={<Profile />} />
                <Route path='subscriptionHolder' element={<SubscriptionHolder />} />
                <Route path='vendor' element={<Vendor />} />
                <Route path='saas' element={<Saas />} />
                <Route path='directLicense' element={<DirectLicense />} />
                <Route path='saasMintPage' element={<SaasMintPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </WalletProvider>
    </ChakraProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
