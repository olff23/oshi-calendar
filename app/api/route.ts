import { ResultIDs } from "@/utils/constants";
import {db} from '@/app/firebase'

const iyamaID = 385;
const gamesCollection = db
  .doc("sites/nihobkiin")
  .collection("players")
  .doc(`${iyamaID}`)
  .collection("games");

export async function GET() {
  const res = await fetch(`https://www.nihonkiin.or.jp/player_results/${`${iyamaID}`.padStart(6, '0')}.json`);
  const jsonData: {games: {
    result: { name: string; mark: string; } | null;
    tournament: { name: string; };
    opponent: { name: string; dan: string; code: number | null; };
    date: string;
  }[] } = await res.json();

  const games = jsonData.games.map(x => {
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
    } as const;
  });

  // TODO: 重複判定
  for (const game of games) {
    await gamesCollection.add(game);
  }

  const gamesSnapshot = await gamesCollection.get();
  console.log(gamesSnapshot.docs.map(x=>x.data()));
 
  return Response.json({ games })
}