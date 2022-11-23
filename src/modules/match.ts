import db from './database'

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

export async function getMatchs(){
    const matchList = (await db.query('SELECT * FROM get5_stats_matches'))[0] as any[]
    return matchList
}

export async function getMaps(matchid: number){
    const mapList = (await db.execute('SELECT * FROM get5_stats_maps WHERE matchid=?', [matchid]))[0] as [any]
    let match = ((await db.execute('SELECT * FROM get5_stats_matches WHERE matchid=?', [matchid]))[0] as [any])[0] as any
    mapList.forEach(map => {
        map.duration = Math.round((map.end_time - map.start_time) / 60000)
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