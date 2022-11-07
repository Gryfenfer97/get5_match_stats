import db from './database'

export async function getMatchs(){
    const matchList = (await db.query('SELECT * FROM get5_stats_matches'))[0]
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
    const players = (await db.execute('SELECT * FROM get5_stats_players WHERE matchid=? AND mapnumber=?', [matchid, mapnumber]))[0] as [any]
    const map = ((await db.execute('SELECT * FROM get5_stats_maps WHERE matchid=? AND mapnumber=?', [matchid, mapnumber]))[0] as any)[0]
    let match = ((await db.execute('SELECT * FROM get5_stats_matches WHERE matchid=?', [matchid]))[0] as [any])[0]
    map.duration = Math.round((map.end_time - map.start_time) / 60000)
    match.map = map;
    match.players = players;
    return match;
}