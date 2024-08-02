// src/MedalRanking.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'; // Para loading com skeletons

function MedalRanking() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [displayedCountries, setDisplayedCountries] = useState(9); // Número inicial de países a serem exibidos

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://apis.codante.io/olympic-games/countries');
        // Ordena os países por medalhas de ouro em ordem decrescente
        const sortedCountries = response.data.data.sort((a, b) => b.gold_medals - a.gold_medals);
        setCountries(sortedCountries);
      } catch (err) {
        setError('Erro ao carregar os dados de medalhas');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Função para carregar mais países
  const loadMoreCountries = () => {
    setDisplayedCountries(prev => prev + 10); // Aumenta o número de países exibidos em 10
  };

  if (loading) {
    return (
      <div>
        <h1>Ranking de Medalhas</h1>
        <ul>
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <Skeleton height={40} />
              <Skeleton height={20} count={3} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Ranking de Medalhas</h1>
      <ul>
        {countries.slice(0, displayedCountries).map(country => ( // Exibe apenas os países com base no estado
          <li key={country.id}>
            <img src={country.flag_url} alt={`${country.name} flag`} width="30" />
            <strong>{country.name}</strong> - Ouro: {country.gold_medals}, Prata: {country.silver_medals}, Bronze: {country.bronze_medals}, Total: {country.total_medals}
          </li>
        ))}
      </ul>
      {displayedCountries < countries.length && ( // Verifica se ainda há mais países para carregar
        <button onClick={loadMoreCountries}>
          Carregar mais países
        </button>
      )}
    </div>
  );
}

export default MedalRanking;
