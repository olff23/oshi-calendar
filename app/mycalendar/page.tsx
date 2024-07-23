import "./main.css";
import iyama from "../000385.json";
import OshiCalendar, { type GetGamesResponse } from "@/components/OshiCalendar";

export default async function MyCalendar() {
  const apiResponse = await fetch("http://localhost:3000/api");
  const data = await apiResponse.json() as unknown as GetGamesResponse;
  
  return (
    <>
      <header className="mycalendar__header">
        <h1>推しカレンダー</h1>
      </header>
      <main className="mycalendar__main">
        <h2>あなたの推しカレンダー</h2>
        <ul>
          {iyama.games.map((x,i)=>(
            <li key={i}>{x.opponent.name}</li>
          ))}
        </ul>
        <OshiCalendar games={data.games} />
      </main>
    </>
  );
}
