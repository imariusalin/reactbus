import React from 'react';
import Clock from 'react-live-clock';


import '../App.css';

function Header() {
  return (
      <header className="App-header">
       <div className="logo"></div>
       <div className="time"><Clock format={'HH:mm'} ticking={true} timezone={'Europe/Helsinki'} /></div>
      </header>
  );
}

export default Header;