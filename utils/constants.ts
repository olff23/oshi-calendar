export enum ResultIDs {
  勝ち = 1,
  負け,
  引き分け,
  無効
}

export enum LeagueIDs {
  日本棋院 = 1,
  関西棋院,
  将棋連盟
}

export const goTitleHolders = [ // TODO: 他の棋士の検索
  { name: '一力遼 棋聖・天元・本因坊（阿含桐山杯・NHK杯）',
    id: 435 },
  { name: '芝野虎丸 名人（テイケイ杯俊英）',
    id: 459 },
  { name: '井山裕太 王座・碁聖・十段（竜星）',
    id: 385 }
] as const;

export const shogiTitleHolders = [ // TODO: 他の棋士の検索
  { name: '藤井聡太 7冠',
    id: 'fujiisota' },
  { name: '伊藤匠 叡王',
    id: 'itotakumi' },
  { name: '谷川浩司 十七世名人',
    id: 'tanigawakouji' },
  { name: '羽生善治 九段',
    id: 'habuyoshiharu' },
  { name: '佐藤康光 九段',
    id: 'satouyasumitsu' },
  { name: '森内俊之 九段',
    id: 'moriuchitoshiyuki' },
  { name: '渡辺明 九段',
    id: 'watanabeakira' }
] as const;
