import React from 'react';
import Clock from 'react-live-clock';
import Header from './components/Header';
import Head from './components/Head';
import './App.css';
import Buses from './components/Buses';
import Location from './components/Location';

import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <div className="container">
      <Header/>
      <Head/>
      <Location/>
      <React.StrictMode>
      <QueryClientProvider client={queryClient}>      
      <Buses/>
      </QueryClientProvider>
      </React.StrictMode>
      </div>
    </div>
  );
}

export default App;
