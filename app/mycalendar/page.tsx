import './main.css';
import OshiCalendar from '@/components/OshiCalendar';
import type { ScheduleGetResponse } from '@/app/api/v1/schedules/route';

export default async function MyCalendar () {
  const apiResponse = await fetch('http://localhost:3000/api');
  const data = await apiResponse.json() as unknown as ScheduleGetResponse;

  return (
    <>
      <main className="my-calendar__main">
        <h2>あなたの推しカレンダー</h2>
        <OshiCalendar games={data.games} />
      </main>
    </>
  );
}
