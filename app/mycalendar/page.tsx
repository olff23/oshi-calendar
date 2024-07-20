import styles from "./page.module.css";
import iyama from "../000385.json";

export default function Home() {
  return (
    <>
        <header className={styles.header}>
            <h1 className={styles.h1}>推しカレンダー</h1>
        </header>
        <main className={styles.main}>
            <ul>
            {iyama.games.map((x,i)=>(
                <li key={i}>{x.opponent.name}</li>
                ))}
            </ul>
        </main>
    </>
  );
}
