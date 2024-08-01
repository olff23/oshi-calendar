'use client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { OshiCalendarDialogEvent } from './OshiCalendarDialogEvent';
import { useState } from 'react';
import { EventClickArg } from '@fullcalendar/core/index.js';
import type { Game } from '@/app/api/v1/schedules/route';

type Props = {
  games: Game[];
};

export default function OshiCalendar ({ games }: Props) {
  const [
    isOpen,
    setIsOpen
  ] = useState(false);
  const [
    dialogTitle,
    setDialogTitle
  ] = useState('');
  const [
    dialogDetails,
    setDialogDetails
  ] = useState('');
  const handleClickEvent = (x: EventClickArg) => {
    setDialogTitle(x.event.title);
    setDialogDetails(x.event.start?.toISOString() ?? '');
    setIsOpen(true);
  };
  return (
    <>
      <FullCalendar
        plugins={[
          dayGridPlugin,
          timeGridPlugin
        ]}
        initialView="dayGridWeek"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek'
        }}
        eventClick={handleClickEvent}
        events={
          games.map((x) => ({
            title: x.tournamentName + '　' + x.opponentName,
            date: x.date
          }))
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
