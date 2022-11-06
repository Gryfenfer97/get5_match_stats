import mysql from 'mysql'

export async function getMatchs(){
    return [{
        team1_name: 'Dolicrane',
        team1_score: 16,
        team2_name: 'Tu es capable',
        team2_score: 14,
    }]
}