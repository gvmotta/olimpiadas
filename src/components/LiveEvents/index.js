// liveEvents.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'; // Para loading com skeletons
import 'react-loading-skeleton/dist/skeleton.css'; // Importa o CSS dos skeletons

function LiveEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLiveEvents = async () => {
      try {
        const response = await axios.get('https://apis.codante.io/olympic-games/events');
        const now = new Date();
        const ongoingEvents = response.data.data.filter(event => {
          const startDate = new Date(event.start_date);
          const endDate = new Date(event.end_date);
          return startDate <= now && now <= endDate;
        });
        setEvents(ongoingEvents);
      } catch (err) {
        setError('Erro ao carregar os eventos');
      } finally {
        setLoading(false);
      }
    };

    fetchLiveEvents();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Jogos Olímpicos - Eventos Ao Vivo</h1>
        <ul>
          {/* Exibe skeletons em vez de texto de carregamento */}
          {Array.from({ length: 5 }).map((_, index) => (
            <li key={index}>
              <Skeleton height={30} />
              <Skeleton height={20} count={2} />
              <Skeleton height={20} />
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Eventos Ao Vivo</h1>
      {events.length > 0 ? (
        <ul>
          {events.map(event => (
            <li key={event.id}>
              <h2>{event.detailed_event_name} ({event.discipline_name})</h2>
              <p>Data: {new Date(event.start_date).toLocaleString()}</p>
              <p>Local: {event.venue_name}</p>
              <h3>Competidores:</h3>
              <ul>
                {event.competitors
                  .sort((a, b) => (a.country_id === 'BRA' ? -1 : 1)) // Ordena colocando o Brasil primeiro
                  .slice(0, 5) // Limita a exibição a no máximo 5 competidores
                  .map(competitor => (
                    <li key={competitor.country_id}>
                      <img src={competitor.country_flag_url} alt={`${competitor.competitor_name} flag`} width="20" />
                      {competitor.competitor_name}
                    </li>
                  ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>Não há eventos ao vivo no momento.</p>
      )}
    </div>
  );
}

export default LiveEvents;
