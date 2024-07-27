import { LeagueIDs } from "@/utils/constants";
import "./main.css";
import OshiCalendar from "@/components/OshiCalendar";
import type { ScheduleGetResponse } from "@/app/api/v1/schedules/route";

export default async function MyCalendar({ params }: { params: { playerID: string } }) {
  const apiParams = `leagueID=${LeagueIDs.日本棋院}&id=${params.playerID}`
  const apiResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/schedules?${apiParams}`);
  const data = await apiResponse.json() as unknown as ScheduleGetResponse;
  console.log(data);
  
  return (
    <>
      <header className="schedule-calendar__header">
        <h1>推しカレンダー</h1>
      </header>
      <main className="schedule-calendar__main">
        <h2>{data.player.name}のカレンダー</h2>
        <OshiCalendar games={data.games} />
      </main>
    </>
  );
}
