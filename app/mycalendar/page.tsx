import styles from "./page.module.css";
import iyama from "../000385.json";
import OshiCalendar, { type GetGamesResponse } from "@/components/OshiCalendar";

export default async function Home() {
  const apiResponse = await fetch("http://localhost:3000/api");
  const data = apiResponse.json() as unknown as GetGamesResponse;
  
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
        <OshiCalendar games={data.games} />
      </main>
    </>
  );
}
