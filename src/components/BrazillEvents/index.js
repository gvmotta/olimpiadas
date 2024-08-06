import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'; // Import Skeleton component;
import { Competidores, Evento, HorarioEvento, NomeEsporte, DiaEvento } from './styles.js';

function BrazilEvents() {
  const [events, setEvents] = useState([]);
  const [eventsTomorrow, setEventsTomorrow] = useState([]);
  const [eventosTotais, setEventosTotais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const today = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato YYYY-MM-DD
  const amanhaA = new Date() // Obtém a data atual no formato YYYY-MM-DD
  amanhaA.setDate(amanhaA.getDate() + 1);
  const amanha = amanhaA.toISOString().split('T')[0];

  const [lastDisplayedDate, setLastDisplayedDate] = useState('');

  /* function getDataAmanhaISOString() {
    const dataAmanha = new Date();
    dataAmanha.setDate(dataAmanha.getDate() + 1);
    console.log("Data amanhã: " + dataAmanha);
    return dataAmanha;
  } */


  function converterParaFormatoBrasileiro(dateTimeString) {
    const data = new Date(dateTimeString);
    return {
      dia: data.getDate().toString().padStart(2, '0'),
      mes: (data.getMonth() + 1).toString().padStart(2, '0'),
      ano: data.getFullYear(),
      horas: data.getHours().toString().padStart(2, '0'),
      minutos: data.getMinutes().toString().padStart(2, '0')
    };
  }

  async function facaRequisicaoAmanha(fetchedEvents) {
    const amanha = new Date();
    amanha.setDate(amanha.getDate() + 1);
    const amanhaISOString = amanha.toISOString().split('T')[0];
    const responseAmanha = await axios.get(`https://apis.codante.io/olympic-games/events?country=BRA&date=${amanhaISOString}`);
    return responseAmanha.data.data;
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let fetchedEvents = [];
        const responseHoje = await axios.get(`https://apis.codante.io/olympic-games/events?country=BRA&date=${today}`);
        fetchedEvents = fetchedEvents.concat(responseHoje.data.data);
        console.log(fetchedEvents);
        let fetchedEventsTomorrow = []
        fetchedEventsTomorrow = await facaRequisicaoAmanha(fetchedEvents);
        fetchedEvents.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
        fetchedEventsTomorrow.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

        const upcomingEvents = fetchedEvents.filter(event => event.status !== 'Finished');
        const upcomingEventsTomorrow = fetchedEventsTomorrow.filter(eventTomorrow => eventTomorrow.status !== 'Finished');
        setTimeout(() => {
          setEvents(upcomingEvents);
          setEventsTomorrow(upcomingEventsTomorrow);
          setEventosTotais(upcomingEvents.length);
          setEventosTotais(upcomingEventsTomorrow.length);
          setLoading(false);
        }, 100);

      } catch (err) {
        setError('Erro ao carregar os eventos');
      } finally {
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h2>Próximos Eventos do Brasil</h2>
        <ul className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index} className="rounded-lg bg-gray-200 animate-pulse">
              <div className="flex px-4 py-2">
                <Skeleton className="w-16 h-16 rounded-full mr-2" />
                <div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
              <div className="px-4 py-2">
                <Skeleton className="h-4 w-full" />
              </div>
              <ul className="px-4 py-2">
                <Skeleton className="h-4 w-1/2 mb-1" />
                <Skeleton className="h-4 w-2/3" />
              </ul>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  function formatarDataParaBrasileiro(dataIso) {
    // Cria um objeto Date a partir da string ISO
    const data = new Date(dataIso);
  
    // Formata a data para o formato brasileiro (dd/MM/yyyy)
    const options = { month: '2-digit', day: '2-digit' };
    return data.toLocaleDateString('pt-BR', options);
  }
  console.log("Data hoje: " + today)
  console.log("Data amanhã: " + amanha)
  const todayFormatadoBrasileiro = formatarDataParaBrasileiro(today);
  const amanhaFormatadoBrasileiro = formatarDataParaBrasileiro(amanha);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className='text-3xl font-bold text-center mb-8 text-black'>Próximos Eventos do Brasil</h2>
      <ul className='space-y-4'>
      <DiaEvento> 
        <p>{todayFormatadoBrasileiro}</p>
      </DiaEvento>
        {events.map((event) => {
          const startDate = new Date(event.start_date);
          const startDateFormatada = startDate.toISOString();
          const dataEvento = converterParaFormatoBrasileiro(startDateFormatada);
          /* console.log(`${dataEvento.dia}/${dataEvento.mes}/${dataEvento.ano}`); */
          const dataEventoFormatada = (`${dataEvento.dia}/${dataEvento.mes}/${dataEvento.ano} ${dataEvento.horas}:${dataEvento.minutos}`);

          const novadata = new Date;
          const novaDataFormatada = novadata.toISOString();
          /* console.log(startDateFormatada + " - " +  novaDataFormatada); */

          const dataEventoDia = dataEventoFormatada.split(" ")[0]
          {/* if (lastDisplayedDate !== dataEventoDia) {
            setLastDisplayedDate(dataEventoDia);
          } */}
          return (
            <>
              <Evento>
                <li key={event.id} className='grid grid-cols-8'>
                  <div className='col-start-1 col-span-2 md:col-span-1'>
                    <HorarioEvento>
                      <p className=''>{dataEventoFormatada.split(" ")[1]}</p>  {/* Access time directly */}
                    </HorarioEvento>
                  </div>
                  <div className='col-start-3 md:col-start-2 col-span-7 py-2 pl-2 flex flex-col justify-center gap-1'>
                    {/* <p>{event.venue_name}</p> */}
                    <NomeEsporte>{event.discipline_name}</NomeEsporte>
                    <p>{event.detailed_event_name}</p>
                  </div>
                  {/* <p>{event.status}</p> */}
                  <div className='col-start-1 col-span-2 md:col-span-1' style={{ borderTop: '0.0625rem solid rgb(219, 219, 219)' }}></div>
                  <div className='col-start-3 md:col-start-2 col-span-7' style={{ borderTop: '0.0625rem solid rgb(219, 219, 219)' }}>
                    <Competidores>
                      <ul className='gap-2 flex flex-col'>
                        {event.competitors
                          .sort((a, b) => (a.country_id === 'Brasil' ? -1 : 1)) // Ordena colocando o Brasil primeiro
                          .slice(0, 2)
                          .map(competitor => (
                            <li key={competitor.country_id} className='flex gap-2'>
                              <img src={competitor.country_flag_url} alt={`${competitor.country_id} flag`} className='w-auto h-[30px]' />
                              <p>{competitor.competitor_name}</p>
                            </li>
                          ))}
                        {eventosTotais < 10 && (
                          < p > Não há mais eventos para hoje. Mostrando todos os eventos disponíveis (até {eventosTotais}).</p>
                        )}
                      </ul>
                    </Competidores>
                  </div>
                </li>
              </Evento>
            </>
          );
          // Event is in the past, so skip it
          return null;
        })}
        <DiaEvento>
          <p>{amanhaFormatadoBrasileiro}</p>
        </DiaEvento>
        {eventsTomorrow.map((eventsTomorrow) => {
          const startDate = new Date(eventsTomorrow.start_date);
          const startDateFormatada = startDate.toISOString();
          const dataEvento = converterParaFormatoBrasileiro(startDateFormatada);
          /* console.log(`${dataEvento.dia}/${dataEvento.mes}/${dataEvento.ano}`); */
          const dataEventoFormatada = (`${dataEvento.dia}/${dataEvento.mes}/${dataEvento.ano} ${dataEvento.horas}:${dataEvento.minutos}`);

          const novadata = new Date;
          const novaDataFormatada = novadata.toISOString();
          /* console.log(startDateFormatada + " - " +  novaDataFormatada); */

          const dataEventoDia = dataEventoFormatada.split(" ")[0]
          {/* if (lastDisplayedDate !== dataEventoDia) {
            setLastDisplayedDate(dataEventoDia);
          } */}
          return (
            <>
              <Evento>
                <li key={eventsTomorrow.id} className='grid grid-cols-8'>
                  <div className='col-start-1 col-span-2 md:col-span-1'>
                    <HorarioEvento>
                      <p className=''>{dataEventoFormatada.split(" ")[1]}</p>  {/* Access time directly */}
                    </HorarioEvento>
                  </div>
                  <div className='col-start-3 md:col-start-2 col-span-7 py-2 pl-2 flex flex-col justify-center gap-1'>
                    {/* <p>{event.venue_name}</p> */}
                    <NomeEsporte>{eventsTomorrow.discipline_name}</NomeEsporte>
                    <p>{eventsTomorrow.detailed_event_name}</p>
                  </div>
                  {/* <p>{event.status}</p> */}
                  <div className='col-start-1 col-span-2 md:col-span-1' style={{ borderTop: '0.0625rem solid rgb(219, 219, 219)' }}></div>
                  <div className='col-start-3 md:col-start-2 col-span-7' style={{ borderTop: '0.0625rem solid rgb(219, 219, 219)' }}>
                    <Competidores>
                      <ul className='gap-2 flex flex-col'>
                        {eventsTomorrow.competitors
                          .sort((a, b) => (a.country_id === 'Brasil' ? -1 : 1)) // Ordena colocando o Brasil primeiro
                          .slice(0, 2)
                          .map(competitor => (
                            <li key={competitor.country_id} className='flex gap-2'>
                              <img src={competitor.country_flag_url} alt={`${competitor.country_id} flag`} className='w-auto h-[30px]' />
                              <p>{competitor.competitor_name}</p>
                            </li>
                          ))}
                        {eventosTotais < 10 && (
                          < p > Não há mais eventos para hoje. Mostrando todos os eventos disponíveis (até {eventosTotais}).</p>
                        )}
                      </ul>
                    </Competidores>
                  </div>
                </li>
              </Evento>
            </>
          );
          // Event is in the past, so skip it
          return null;
        })}
      </ul>
    </div>
  );

}

export default BrazilEvents;
