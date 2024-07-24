import "./main.css";
import OshiCalendar, { type GetGamesResponse } from "@/components/OshiCalendar";

export default async function MyCalendar() {
  const apiResponse = await fetch("http://localhost:3000/api");
  const data = await apiResponse.json() as unknown as GetGamesResponse;
  
  return (
    <>
      <header className="my-calendar__header">
        <h1>推しカレンダー</h1>
      </header>
      <main className="my-calendar__main">
        <h2>あなたの推しカレンダー</h2>
        <OshiCalendar games={data.games} />
      </main>
    </>
  );
}
