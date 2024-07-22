'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

export type Game = {
  tournamentName: string;
  opponentName: string;
  opponentID: number | null;
  date: string;
  resultID: 0 | 1 | 2 | 3 | null;
  resultName: string | null;
}

export type GetGamesResponse = {
  games: Game[]
}

export default function OshiCalendar({ games }: GetGamesResponse) {
  return (
    <FullCalendar
      plugins={[ dayGridPlugin, timeGridPlugin ]}
      initialView="dayGridWeek"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek'
      }}
      events={[
        { title: games?.[0]?.tournamentName ?? '', date: '2024-07-22T15:00:00' },
        { title: 'event 2', date: '2024-07-25' }
      ]}
    />
  );  
}