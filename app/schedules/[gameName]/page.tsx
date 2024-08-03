import Link from 'next/link';

import '../main.css';
import { notFound } from 'next/navigation';

import { goTitleHolders, shogiTitleHolders } from '@/utils/constants';

export default function gameHome ({ params }: { params: { gameName: string } }) {
  const gameName = decodeURI(params.gameName);
  const isGo = gameName === '囲碁';
  const isShogi = gameName === '将棋';

  if (!isGo && !isShogi) notFound(); // 404

  const titleHolders = isGo
    ? goTitleHolders
    : shogiTitleHolders;
  const leagueName = isGo
    ? '日本棋院'
    : '将棋連盟';
  return (
    <>
      <main className="schedule-calendar__main">
        <header className="schedule-calendar__header">
          <h2>{leagueName}所属棋士</h2>
        </header>
        <h3>タイトルホルダー</h3>
        <ul role='list'>
          {titleHolders.map((x) => <li key={x.id}>
            <Link href={`${gameName}/${x.id}`}>{x.name}</Link>
          </li>)}
        </ul>
      </main>
    </>
  );
}
