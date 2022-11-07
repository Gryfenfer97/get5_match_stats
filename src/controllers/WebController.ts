import { Request, Response, Router } from 'express'
import { getMatchs } from '../modules/match'

export default function routes(router: Router) {
	router.get('/', serveHomePage)
	router.get('/match/:id', serveMatchPage)
	router.get('/match/:id/map/:id', serveMapPage)
}

async function serveHomePage(_req: Request, res: Response) {
	console.log(await getMatchs())
	const matchsData = [
		{id: 1, team1: 'Team 1', team2: 'Team 2', team1_score: 2, team2_score: 1, series_type: 'bo3'},
		{id: 2, team1: 'Team 3', team2: 'Team 4', team1_score: 0, team2_score: 2, series_type: 'bo3'},
	]
	res.render('home.ejs', {matches: matchsData})

}

async function serveMatchPage(req: Request, res: Response) {
	const matchData = { team1: 'Team 1', team2: 'Team 2', team1Score: 2, team2Score: 1, maps: [
		{ mapName: 'de_dust2', team1Score: 16, team2Score: 14, duration: '30:32', mapNumber: 1 },
		{ mapName: 'de_inferno', team1Score: 13, team2Score: 16, duration: '27:19', mapNumber: 2 },
		{ mapName: 'de_mirage', team1Score: 16, team2Score: 15, duration: '40:46', mapNumber: 3 }] }
	res.render('match.ejs', matchData)
}

async function serveMapPage(req: Request, res: Response) {
	const mapData = {
		team1: 'team1', team2: 'team2', mapName: 'de_dust2', team1_score: 16, team2_score: 14,
		players: [
			{name: 'player1', steamid: '76561197960287930', kills: 16, assists: 17, deaths: 19, team: 'team1'},
			{name: 'player2', steamid: '76561197960287931', kills: 13, assists: 10, deaths: 14, team: 'team1'},
			{name: 'player3', steamid: '76561197960287932', kills: 16, assists: 17, deaths: 19, team: 'team1'},
			{name: 'player4', steamid: '76561197960287933', kills: 16, assists: 17, deaths: 19, team: 'team1'},
			{name: 'player5', steamid: '76561197960287934', kills: 16, assists: 17, deaths: 19, team: 'team1'}

		]
	}
	res.render('map.ejs', mapData)
}