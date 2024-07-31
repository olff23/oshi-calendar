import { notFound } from "next/navigation";

import { LeagueIDs } from "@/utils/constants";
import OshiCalendar from "@/components/OshiCalendar";
import type { ScheduleGetResponse } from "@/app/api/v1/schedules/route";

import "../../main.css";
import Link from "next/link";

type Params = {
  gameName: string;
  playerID: string;
};

export default async function NihonkiinPlayer({ params }: { params: Params }) {
  const gameName = decodeURI(params.gameName)
  const isGo = gameName === '囲碁';
  const isShogi = gameName === '将棋';

  if (!isGo && !isShogi) notFound();

  const leagueID = isGo ? LeagueIDs.日本棋院 : LeagueIDs.将棋連盟;
  const apiParams = `leagueID=${leagueID}&id=${params.playerID}`
  const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules?${apiParams}`);
  const data = await apiResponse.json() as unknown as ScheduleGetResponse;
  console.log(leagueID, params.playerID, data);

  return (
    <>
      <header className="schedule-calendar__header">
        <h1><Link href="/">推しカレンダー</Link></h1>
      </header>
      <main className="schedule-calendar__main">
        <h2>{data.player.name}のカレンダー</h2>
        <OshiCalendar games={data.games} />
      </main>
    </>
  );
}
