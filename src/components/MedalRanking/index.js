// src/MedalRanking.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'; // Para loading com skeletons
import { Background, NomePais, Medalhista } from './styles.js';
import GoldMedal from '../../assets/gold-medal.png';
import SilverMedal from '../../assets/silver-medal.png';
import BronzeMedal from '../../assets/bronze-medal.png';
import AllMedals from '../../assets/all-medals.png';
import FlagIcoin from '../../assets/tabler_flag.svg';


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
        setTimeout(() => {
          const sortedCountries = response.data.data.sort((a, b) => b.gold_medals - a.gold_medals);
          setCountries(sortedCountries);
          setLoading(false);
        }, 1000);
        /* const sortedCountries = response.data.data.sort((a, b) => b.gold_medals - a.gold_medals);
        setCountries(sortedCountries); */
      } catch (err) {
        setError('Erro ao carregar os dados de medalhas');
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
      <>
        <Background>
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-black">Ranking de Medalhas</h1>
            <ul className="list-disc space-y-4">
              {/* Fix: Remove the for loop and use an array of fixed size */}
              {Array(10).fill(null).map((_, index) => (
                <li key={index} className='flex rounded-md bg-white p-4 '>
                  <div className='flex items-center gap-x-4'>
                    <div className='flex items-center'>
                      <Skeleton height={20} width={20} circle /> {/* Skeleton for position of the country */}
                    </div>
                    <Skeleton height={40} width={60} /> {/* Skeleton for flag */}
                  </div>
                  <div className='flex justify-around w-full items-center'>
                    <div className='flex items-center flex-col'>
                      <img className='size-5' src={GoldMedal} alt='' />
                      <Skeleton height={20} width={10} /> {/* Skeleton for medal details */}
                    </div>
                    <div className='flex items-center flex-col'>
                      <img className='size-5' src={SilverMedal} alt='' />
                      <Skeleton height={20} width={10} /> {/* Skeleton for medal details */}
                    </div>
                    <div className='flex items-center flex-col'>
                      <img className='size-5' src={BronzeMedal} alt='' />
                      <Skeleton height={20} width={10} /> {/* Skeleton for medal details */}
                    </div>
                    <div className='flex items-center flex-col'>
                      <img className='size-5' src={AllMedals} alt='' />
                      <Skeleton height={20} width={10} /> {/* Skeleton for total medals */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Background>
      </>
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
    <Background>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-black">Ranking de Medalhas</h1>
        <ul className="list-disc space-y-4">
          <div className='flex rounded-md justify-around quadro px-4 py-1'>
            <div className="flex items-center gap-x-4 font-bold">
              <div className='w-[30px] flex justify-center'>
                <p>#</p>
              </div>
              <div className='w-[40px] flex justify-center'>
                <img src={FlagIcoin} alt='' />
              </div>
              <div className='flex justify-center'>
                <p className='w-[80px]'>País</p>
              </div>
            </div>
            <div className='flex justify-around w-full items-center'>
              <img className='size-5' src={GoldMedal} alt='' />
              <img className='size-5' src={SilverMedal} alt='' />
              <img className='size-5' src={BronzeMedal} alt='' />
              <img className='size-5' src={AllMedals} alt='' />
            </div>
          </div>
          {displayedList.map((country, index) => {
            // Calcula a posição real no ranking
            const realIndex = countries.findIndex(c => c.name === country.name) + 1;
            return (
              <>
                
                <Medalhista>
                  <li className='flex rounded-md bg-white p-4 ' key={country.id}>
                    <div className='flex items-center gap-x-4'>
                      <strong className='w-[30px] flex justify-center'>{realIndex}º</strong> {/* Exibe a posição real */}
                      <div className='flex items-center'>
                        <img className='object-cover max-w-10' src={country.flag_url} alt={`${country.name} flag`} />
                      </div>
                      <NomePais>{country.name}</NomePais>
                    </div>
                    <div className='flex justify-around w-full items-center'>
                      <div className='block '>
                        <p>{country.gold_medals}</p>
                      </div>
                      <div className='block '>
                        <p>{country.silver_medals}</p>
                      </div>
                      <div className='block '>
                        <p>{country.bronze_medals}</p>
                      </div>
                      <div className='block '>
                        <p>{country.total_medals}</p>
                      </div>
                    </div>
                  </li>
                </Medalhista>
              </>
            );
          })}
        </ul>
        <div className="text-center mt-4">
          {displayedCountries < countries.length && ( // Verifica se ainda há mais países para carregar
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={loadMoreCountries}>
              Carregar mais países
            </button>
          )}
        </div>
      </div>
    </Background>
  );
}

export default MedalRanking;
