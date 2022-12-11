import db from './database'
import path from 'path'

type CSMap =
    'de_ancient' |
    'de_dust2' |
    'de_inferno' |
    'de_mirage' |
    'de_nuke' |
    'de_overpass' |
    'de_vertigo'

type Get5StatsPlayers = {
    matchid: number,
    mapnumber: number,
    steamid64: number,
    team: string,
    rounds_played: number,
    name: string,
    kills: number,
    deaths: number,
    assists: number,
    flashbang_assists: number,
    teamkills: number,
    knife_kills: number,
    headshot_kills: number,
    damage: number,
    utility_damage: number,
    enemies_flashed: number,
    friendlies_flashed: number,
    bomb_plants: number,
    bomb_defuses: number,
    v1: number,
    v2: number,
    v3: number,
    v4: number,
    v5: number,
    '2k': number,
    '3k': number,
    '4k': number,
    '5k': number,
    firstkill_t: number,
    firstkill_ct: number,
    firstdeath_t: number,
    firstdeath_ct: number,
    tradekill: number,
    kast: number,
    contribution_score: number,
    mvp: number,
}

type Get5StatsMap = {
    matchid: number,
    mapnumber: number,
    start_time: Date,
    end_time: Date,
    winner: 'team1' | 'team2',
    mapname: CSMap,
    team1_score: number,
    team2_score: number,
}

type Get5StatsMatch = {
    matchid: number,
    start_time: Date,
    end_time: Date,
    winner: 'team1' | 'team2',
    series_type: 'bo1' | 'bo2' | 'bo3',
    team1_name: string,
    team1_score: number,
    team2_name: string,
    team2_score: number,
    server_id: number
}

type Maps = (Get5StatsMap & {duration: number})[]

type Match = Get5StatsMatch & {maps: Maps}


export async function getMatchs(){
    let stages = [{name: "Poules", matches: []}, {name: "Tournoi amateur", matches: []}, {name: "Tournoi Elite", matches: []}] as {name: string, matches: Get5StatsMatch[]}[]
    for(const stageid in stages){
        stages[stageid].matches = (await db.execute('SELECT * FROM get5_stats_matches WHERE stage_id=?', [Number(stageid)+1]))[0] as Get5StatsMatch[]
    }
    return stages
}

export async function getMatchFromId(matchid: number) : Promise<Match>{
    const [mapList] = await db.execute('SELECT * FROM get5_stats_maps WHERE matchid=?', [matchid]) as unknown as [Maps] // TODO: je fais quoi ?
    let match = ((await db.execute('SELECT * FROM get5_stats_matches WHERE matchid=?', [matchid]))[0] as Get5StatsMatch[])[0] as Match
    mapList.forEach(map => {
        map.duration = Math.round((map.end_time.getTime() - map.start_time.getTime()) / 60000)
    });
    match.maps = mapList
    return match
}

export async function getMap(matchid: number, mapnumber: number){
    const players = (await db.execute('SELECT * FROM get5_stats_players WHERE matchid=? AND mapnumber=? ORDER BY kills DESC', [matchid, mapnumber]))[0] as Get5StatsPlayers[]
    const map = ((await db.execute('SELECT * FROM get5_stats_maps WHERE matchid=? AND mapnumber=?', [matchid, mapnumber]))[0] as any)[0]
    let match = ((await db.execute('SELECT * FROM get5_stats_matches WHERE matchid=?', [matchid]))[0] as [any])[0]
    map.duration = Math.round((map.end_time - map.start_time) / 60000)
    match.map = map;
    match.players = players;
    return match;
}

export async function getDemoUrl(matchid: number, mapnumber: number, mapname: string){
	if(!process.env.DEMOS_BASE_URL) throw Error('no base url setup for demos')
    let extension = '' as string
    if(process.env.DEMOS_MATCHS_ZIP?.split(',').includes(`${matchid}-${mapnumber}`)){
        extension = 'zip'
    }
    else {
        extension = 'dem'
    }
	const demo_url = path.join(process.env.DEMOS_BASE_URL, `${matchid}_map${mapnumber}_${mapname}.${extension}`)
    return demo_url
}