import { LeagueIDs } from "@/utils/constants";
import OshiCalendar, { type GetGamesResponse } from "@/components/OshiCalendar";
import Link from "next/link";

export default async function MyCalendar() {
    const titleHolders = [ // TODO: 他の棋士の検索
        { name: '井山裕太', id: 385 },
        { name: '一力遼', id: 435 },
        { name: '芝野虎丸', id: 459 },
    ] as const;
    // const apiParams = titleHolders.map(x=> `leagueID=${LeagueIDs.日本棋院}&id=${x.id}`);
    // const apiResponse = await Promise.all(apiParams.map(x => fetch(
    //     `${process.env.NEXT_PUBLIC_API_URL}/schedules?${x}`
    // )));
    // const data = await Promise.all(apiResponse.map(x =>  x.json() as unknown as Promise<GetGamesResponse>));
    
    return (
      <>
        <header className="my-calendar__header">
          <h1>日本棋院所属棋士</h1>
        </header>
        <main className="my-calendar__main">
          <h2>タイトルホルダー</h2>
          <ul>
            {titleHolders.map(x => (
                <li key={x.id}>
                    <Link href={`/schedules/nihonkiin/${x.id}`}>
                      {x.name}
                    </Link>
                </li>
            ))}
          </ul>
        </main>
      </>
    );
  }