import { ResultIDs } from "@/utils/constants";

export async function GET() {
  const res = await fetch('https://www.nihonkiin.or.jp/player_results/000385.json', {
  })
  const data = await res.json()
  const games = data.games.map((x: {
    result: { name: string; mark: string; } | null;
    tournament: { name: string; };
    opponent: { name: string; dan: string; code: number | null; };
    date: string;
  }) => {
    let resultID = null;
    if (x.result) {
        switch (x.result.name) {
            case "victory":
                resultID = ResultIDs.勝ち;
                break;
            case "defeat":
                resultID = ResultIDs.負け;
                break;
            default:
                resultID = ResultIDs.引き分け;
                break;
        }
    }
    return {
        tournamentName: x.tournament.name,
        opponentName: x.opponent.name + " " + x.opponent.dan,
        opponentID: x.opponent.code,
        date: x.date,
        resultID: resultID,
        resultName: x.result?.mark ?? null,
    }
  });
 
  return Response.json({ games })
}