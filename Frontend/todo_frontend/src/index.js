import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider  } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById('root'));

//queryclient
const queryclient = new QueryClient()

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);


