import { LeagueIDs, ResultIDs } from "@/utils/constants";
// import { db } from '@/app/firebase';

export type Game = {
  tournamentName: string;
  opponentName: string;
  opponentID: number | null;
  date: string;
  resultID: 0 | 1 | 2 | 3 | null;
  resultName: string | null;
}

export type ScheduleGetResponse = {
  player: {
    id: number;
    name: string;
  };
  games: Game[];
}

// const gamesCollection = db
//   .doc("sites/nihobkiin")
//   .collection("players")
//   .doc(`${iyamaID}`)
//   .collection("games");

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const  leagueID = parseInt(searchParams.get('leagueID') ?? '', 10);
  const id = searchParams.get('id');
  if (leagueID == null || id == null) return Response.error();
  if (leagueID === LeagueIDs.日本棋院) {
    const res = await fetch(`https://www.nihonkiin.or.jp/player_results/${id.padStart(6, '0')}.json`);

    type 日本棋院棋士データ = {
      player: {
        code: number ;
        name: string;
      },
      games: {
        result: { name: string; mark: string; } | null;
        tournament: { name: string; };
        opponent: { name: string; dan: string; code: number | null; };
        date: string;
      }[]
    }
    const jsonData: 日本棋院棋士データ = await res.json();
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
      } as Game;
    });
    return Response.json({
      player: {
        id: jsonData.player.code,
        name: jsonData.player.name
      },
      games
    } as ScheduleGetResponse);
  }


  // TODO: 重複判定
  // for (const game of games) {
  //   await gamesCollection.add(game);
  // }

  // const gamesSnapshot = await gamesCollection.get();
  // console.log(gamesSnapshot.docs.map(x=>x.data()));
 
  return Response.error(); // leagueID が一致しない
}