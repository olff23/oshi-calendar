import { LeagueIDs, ResultIDs } from '@/utils/constants';
import type { NextRequest } from 'next/server';
import { Dom, parseFromString } from 'dom-parser';
// import { db } from '@/app/firebase';

export type Game = {
  tournamentName: string;
  opponentName: string;
  opponentID: number | string | null;
  date: string;
  resultID: 0 | 1 | 2 | 3 | null;
  resultName: string | null;
};

export type ScheduleGetResponse = {
  player: {
    id: number | string;
    name: string;
  };
  games: Game[];
};

// const gamesCollection = db
//   .doc("sites/nihobkiin")
//   .collection("players")
//   .doc(`${iyamaID}`)
//   .collection("games");

async function get日本棋院棋士データ (id: string): Promise<Response> {
  type 日本棋院棋士データ = {
    player: {
      code: number ;
      name: string;
    };
    games: {
      result: { name: string;
        mark: string; } | null;
      tournament: { name: string };
      opponent: { name: string;
        dan: string;
        code: number | null; };
      date: string;
    }[];
  };
  let jsonData: 日本棋院棋士データ;
  try {
    const res = await fetch(`https://www.nihonkiin.or.jp/player_results/${id.padStart(
      6,
      '0'
    )}.json`);
    jsonData = await res.json() as 日本棋院棋士データ;
  } catch (e) {
    console.error(e);
    return Response.error();
  }

  const games = jsonData.games.map((x) => {
    let resultID = null;
    if (x.result) {
      switch (x.result.name) {
        case 'victory':
          resultID = ResultIDs.勝ち;
          break;
        case 'defeat':
          resultID = ResultIDs.負け;
          break;
        default:
          resultID = ResultIDs.引き分け;
          break;
      }
    }
    return {
      tournamentName: x.tournament.name,
      opponentName: x.opponent.name + ' ' + x.opponent.dan,
      opponentID: x.opponent.code,
      date: x.date,
      resultID: resultID,
      resultName: x.result?.mark ?? null
    } as Game;
  });

  // TODO: 重複判定
  // for (const game of games) {
  //   await gamesCollection.add(game);
  // }

  // const gamesSnapshot = await gamesCollection.get();
  // console.log(gamesSnapshot.docs.map(x=>x.data()));

  return Response.json({
    player: {
      id: jsonData.player.code,
      name: jsonData.player.name
    },
    games
  } satisfies ScheduleGetResponse);
}

async function get将棋棋士データ (id: string): Promise<Response> {
  let doc: Dom;
  try {
    // CHECK: XHR のほうがパフォーマンスよかったりしそう
    console.warn(
      'fetch to ',
      id
    );
    const res = await fetch(`https://shogidata.info/plan/${id}.html`);
    // console.log(res);
    const buf = await res.arrayBuffer();
    doc = parseFromString(new TextDecoder().decode(buf));
  } catch (e) {
    console.error(e);
    return Response.error();
  }

  const games: Game[] = [];
  const gamePlanDocs = doc.getElementsByClassName('plan-plan');
  for (const x of gamePlanDocs) {
    const dateDoc = x.childNodes[0];
    const subDoc = x.childNodes[1];
    const oppDocs = x.childNodes[2].getElementsByTagName('a');
    const rateDoc = x.childNodes[3] ?? { textContent: null };

    console.log(oppDocs);

    // Game ==================================================================
    const tournamentName = subDoc.textContent;

    let opponentName = '';
    let opponentID = '';
    if (oppDocs.length) {
      const opponentNames: string[] = oppDocs.map((y) => y.textContent);
      opponentName = opponentNames.join(' か ');

      const opponentURLs: string[] = oppDocs.
        map((y) => y.attributes.find((z) => z.name === 'href')?.value ?? '').
        filter((y) => y.length);
      const opponentIDs: string[] = opponentURLs.map((y) => y.
        split('/').at(-1)?.
        split('.')[0] ??
        '');
      opponentID = opponentIDs.join(',');
    } else {
      opponentName = x.childNodes[2].textContent;
      if (opponentName === '〃') {
        opponentName = games.at(-1)?.opponentName ?? opponentName;
        opponentID = (games.at(-1)?.opponentID ?? opponentID) as string;
      }
    }

    let date = dateDoc.textContent;
    if (date === '-' || !date) date = '';
    const dateYMD = [
      new Date().getFullYear(),
      ...date.split('/').map((y) => parseInt(
        y,
        10
      ))
    ];
    const currentMonth = new Date().getMonth();
    if (dateYMD[1] <= 2 && currentMonth >= 10) dateYMD[0] += 1;
    date = dateYMD.map((y, j) => `${y}`.padStart(
      j === 0
        ? 4
        : 2,
      '0'
    )).join('-');

    const resultID = null;
    const resultName = rateDoc.textContent || null;
    // =======================================================================

    games.push({
      tournamentName,
      opponentName,
      opponentID,
      date,
      resultID,
      resultName
    });
  }

  // 棋士名
  let name: string | undefined = doc.getElementsByClassName('content-heading')[0].getElementsByTagName('h1')[0]?.textContent?.split(' : ')[0];
  name ??= doc.getElementsByTagName('nav')[0].getElementsByTagName('ul')[0]?.childNodes[1].childNodes[0].textContent ?? '';

  return Response.json({
    player: { id,
      name },
    games
  } satisfies ScheduleGetResponse);
}

export async function GET (request: NextRequest): Promise<Response> {
  const { searchParams } = request.nextUrl;
  const leagueID = parseInt(
    searchParams.get('leagueID') ?? '',
    10
  );
  const id = searchParams.get('id');
  if (!leagueID || !id) return Response.error();

  switch (leagueID as LeagueIDs) {
    case LeagueIDs.日本棋院:
      return await get日本棋院棋士データ(id);
    case LeagueIDs.将棋連盟:
      return await get将棋棋士データ(id);
    case LeagueIDs.関西棋院:
      return Response.json({});
    default:
      return Response.error(); // leagueID が一致しない
  }
}
