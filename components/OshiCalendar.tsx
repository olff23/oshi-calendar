'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { OshiCalendarDialogEvent } from './OshiCalendarDialogEvent';
import { useState } from 'react';
import { EventClickArg } from '@fullcalendar/core/index.js';

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
  console.log(games?.[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDetails, setDialogDetails] = useState('');
  const handleClickEvent = (x: EventClickArg) => {
    setDialogTitle(x.event.title);
    setDialogDetails(x.event.start?.toISOString() ?? '');
    setIsOpen(true);
  }
  return (
    <>
      <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin ]}
        initialView="dayGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        eventClick={handleClickEvent}
        events={
          games?.map(x => (
              {title: x.tournamentName + " " + x.opponentName,
               date: x.date,
              }
          ))
        }
      />  
      <OshiCalendarDialogEvent
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={dialogTitle}
        details={dialogDetails}
      />
    </>
  );  
}