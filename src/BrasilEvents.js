import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BrazilEvents() {
  const [events, setEvents] = useState([]);
  const [eventosTotais, setEventosTotais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const today = new Date().toISOString().split('T')[0]; // Obtém a data atual no formato YYYY-MM-DD

  function getDataAmanhaISOString() {
    const dataAmanha = new Date();
    dataAmanha.setDate(dataAmanha.getDate() + 1);
    console.log("Data amanhã: " + dataAmanha);
    return dataAmanha;
  }
  

  function converterParaFormatoBrasileiro(dateTimeString) {
    const data = new Date(dateTimeString);
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0
    const ano = data.getFullYear();
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
/*  const segundos = data.getSeconds().toString().padStart(2, '0'); */   
    const dataFormatada = `${dia}/${mes}/${ano} ${horas}:${minutos}`;

    return dataFormatada;
  }

  async function facaRequisicaoAmanha (fetchedEvents) {
    const amanha = getDataAmanhaISOString();
    console.log(amanha);
    const responseAmanha = await axios.get(`https://apis.codante.io/olympic-games/events?country=BRA&date=${amanha}`);
    fetchedEvents = fetchedEvents.concat(responseAmanha.data.data);
    console.log(fetchedEvents);
    return fetchedEvents;
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        let fetchedEvents = [];
        const responseHoje = await axios.get(`https://apis.codante.io/olympic-games/events?country=BRA&date=${today}`);
        fetchedEvents = fetchedEvents.concat(responseHoje.data.data);

        if (fetchedEvents.length < 10) {
          facaRequisicaoAmanha(fetchedEvents);
        }

        setEvents(fetchedEvents.slice(0, 10));
        setEventosTotais(fetchedEvents.length);

        events.map((event) => {
          const startDate = new Date(event.start_date);
          const startDateFormatada = startDate.toISOString();

          const novadata = new Date();
          const novaDataFormatada = novadata.toISOString();
          console.log(startDateFormatada + " - " +  novaDataFormatada);
          
          let count = 0;
          if (startDateFormatada > novaDataFormatada) { // Check if start date is in the future
            count++;
            if (count < 10) {
              facaRequisicaoAmanha(fetchedEvents);
            }
          }
        }); 

        
      } catch (err) {
        setError('Erro ao carregar os eventos');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <p>Carregando eventos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Próximos Eventos do Brasil</h2>
      <ul>
        {events.map((event) => {
          const startDate = new Date(event.start_date);
          const startDateFormatada = startDate.toISOString();
          const dataEvento = converterParaFormatoBrasileiro(startDateFormatada);

          const novadata = new Date;
          const novaDataFormatada = novadata.toISOString();
          console.log(startDateFormatada + " - " +  novaDataFormatada);
          
          if (startDateFormatada > novaDataFormatada) { // Check if start date is in the future
            console.log("true");
            return (
              <li key={event.id}>
                <strong>{event.discipline_name} - {event.detailed_event_name}</strong>
                <p>{dataEvento.toLocaleString()} - {event.venue_name}</p>
                <ul>
                  {event.competitors
                  .sort((a, b) => (a.country_id === 'Brasil' ? -1 : 1)) // Ordena colocando o Brasil primeiro
                  .slice(0, 5)
                  .map(competitor => (
                    <li key={competitor.country_id}>
                      <img src={competitor.country_flag_url} alt={`${competitor.country_id} flag`} width="30" />
                      {competitor.competitor_name}
                    </li>
                  ))}
                  {eventosTotais < 10 && (
                    < p > Não há mais eventos para hoje. Mostrando todos os eventos disponíveis (até {eventosTotais}).</p>
                  )}
                </ul>
              </li>
            );
          } 
          // Event is in the past, so skip it
          return null;
        })}
      </ul>
    </div>
  );
 
}

export default BrazilEvents;
