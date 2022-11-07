import db from './database'

export async function getMatchs(){
    const matchList = (await db.query('SELECT * FROM get5_stats_matches'))[0]

    return matchList
}

export async function getMaps(matchid: string){
    const mapList = (await db.execute('SELECT * FROM get5_get_maps WHERE matchid=?', matchid))[0] as [any]
    mapList.forEach(map => {
        map.duration = map.end_time - map.start_time //TODO: check if it works with the database result
    });
    return mapList
}