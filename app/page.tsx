import Link from 'next/link';
import Image from 'next/image';
import './main.css';
import { goTitleHolders, shogiTitleHolders } from './schedules/[gameName]/page';

export default function Home () {
  return (
    <main className='home__main'>
      <div className="home__eye-catch">
        <Image src="/logo-break.png" width={450} height={450} priority alt='推しカレンダー' />
      </div>
      <section className="home__section">
        <h2 className="home__section-title">推しの対局日程を見よう！</h2>
        <ul role='list'>
          <li>
            <Link href="/schedules/将棋">将棋</Link>
            <ul role='list'>
              {shogiTitleHolders.map((x) => <li key={x.id}>
                <Link href={`schedules/将棋/${x.id}`}>{x.name}</Link>
              </li>)}
            </ul>
          </li>
          <li>
            <Link href="/schedules/囲碁">囲碁</Link>
            <ul role='list'>
              {goTitleHolders.map((x) => <li key={x.id}>
                <Link href={`schedules/囲碁/${x.id}`}>{x.name}</Link>
              </li>)}
            </ul>
          </li>
        </ul>
      </section>
    </main>
  );
}
