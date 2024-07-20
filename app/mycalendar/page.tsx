'use client';
import styles from "./page.module.css";
import iyama from "../000385.json";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid'


export default function Home() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.h1}>推しカレンダー</h1>
      </header>
      <main className={styles.main}>
        <h2 className={styles.h2}>あなたの推しカレンダー</h2>
        <ul>
          {iyama.games.map((x,i)=>(
            <li key={i}>{x.opponent.name}</li>
          ))}
        </ul>
        <FullCalendar
          plugins={[ dayGridPlugin, timeGridPlugin ]}
          initialView="dayGridWeek"
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }}
          events={[
            { title: 'event 1', date: '2024-07-22T15:00:00' },
            { title: 'event 2', date: '2024-07-25' }
          ]}
        />
      </main>
    </>
  );
}
