// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'; // Importa a biblioteca de skeletons
import 'react-loading-skeleton/dist/skeleton.css'; // Importa o CSS dos skeletons
import MedalRanking from './medalRanking';
import LiveEvents from './liveEvents';

function App() {

  return (
    <div>
      <h1>Jogos Olímpicos</h1>
      <MedalRanking />
      <LiveEvents />
    </div>
  );
}

export default App;
