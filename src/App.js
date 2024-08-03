// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'; // Importa a biblioteca de skeletons
import 'react-loading-skeleton/dist/skeleton.css'; // Importa o CSS dos skeletons
import MedalRanking from './MedalRanking'; // Certifique-se de que os nomes dos arquivos estejam corretos
import LiveEvents from './LiveEvents';
import BrazilEvents from './BrasilEvents'; // Corrija para corresponder ao nome do arquivo

function App() {
  return (
    <div>
      <h1>Jogos Olímpicos</h1>
      <MedalRanking />
      <LiveEvents />
      <BrazilEvents />
    </div>
  );
}

export default App;
