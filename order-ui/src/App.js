import React, { useEffect, useState } from 'react';
import image2 from './logo.svg';
import OrderTable from './components/Orders/OrderTable';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Order Portal</h1>
      <OrderTable/>
    </div>
  );
}

export default App;
