import Link from 'next/link';

import '../main.css';
import { notFound } from 'next/navigation';

const goTitleHolders = [ // TODO: 他の棋士の検索
  { name: '一力遼 棋聖・天元・本因坊（阿含桐山杯・NHK杯）',
    id: 435 },
  { name: '芝野虎丸 名人（テイケイ杯俊英）',
    id: 459 },
  { name: '井山裕太 王座・碁聖・十段（竜星）',
    id: 385 }
] as const;

const shogiTitleHolders = [ // TODO: 他の棋士の検索
  { name: '藤井聡太 7冠',
    id: 'fujiisota' },
  { name: '伊藤匠 叡王',
    id: 'itotakumi' },
  { name: '谷川浩司 十七世名人',
    id: 'tanigawakouji' },
  { name: '羽生善治 九段',
    id: 'habuyoshiharu' },
  { name: '佐藤康光 九段',
    id: 'satoyasumitsu' },
  { name: '森内俊之 九段',
    id: 'moriuchitoshiyuki' },
  { name: '渡辺明 九段',
    id: 'watanabeakira' }
] as const;

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
      <header className="schedule-calendar__header">
        <h1>{leagueName}所属棋士</h1>
      </header>
      <main className="schedule-calendar__main">
        <h2>タイトルホルダー</h2>
        <ul>
          {titleHolders.map((x) => <li key={x.id}>
            <Link href={`${gameName}/${x.id}`}>{x.name}</Link>
          </li>)}
        </ul>
      </main>
    </>
  );
}
