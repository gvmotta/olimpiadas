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

  // Obtemos o índice do Brasil se estiver presente
  const brazilIndex = countries.findIndex(country => country.name === 'Brasil');

  // Cria uma lista com os primeiros países e garante que o Brasil esteja incluído
  let displayedList = countries.slice(0, displayedCountries);

  // Se o Brasil não está na lista exibida e existe na lista completa, adiciona-o
  if (brazilIndex >= displayedCountries) {
    // Adiciona o Brasil na posição correta
    displayedList.push(countries[brazilIndex]);
  }

  return (
    <div>
      <h1>Ranking de Medalhas</h1>
      <ul>
        {displayedList.map((country, index) => {
          // Calcula a posição real no ranking
          const realIndex = countries.findIndex(c => c.name === country.name) + 1;
          return (
            <li key={country.id}>
              <strong>{realIndex}. </strong> {/* Exibe a posição real */}
              <img src={country.flag_url} alt={`${country.name} flag`} width="30" />
              <strong>{country.name}</strong> - Ouro: {country.gold_medals}, Prata: {country.silver_medals}, Bronze: {country.bronze_medals}, Total: {country.total_medals}
            </li>
          );
        })}
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
