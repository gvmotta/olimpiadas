// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'; // Importa a biblioteca de skeletons
import 'react-loading-skeleton/dist/skeleton.css'; // Importa o CSS dos skeletons
import MedalRanking from './components/MedalRanking'; // Certifique-se de que os nomes dos arquivos estejam corretos
import LiveEvents from './components/LiveEvents';
import BrazilEvents from './components/BrazillEvents'; // Corrija para corresponder ao nome do arquivo
import NavBar from './components/navbar';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <div className='main'>
        <div className=''>
          <MedalRanking />
        </div>
        <div className=''>
          <BrazilEvents />
        </div>
      </div>
      {/* <LiveEvents /> */}
    </>

  );
}

export default App;
