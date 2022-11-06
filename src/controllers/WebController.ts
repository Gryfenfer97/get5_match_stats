import { Request, Response, Router } from 'express'
import config from '../config'
import ejs from 'ejs'
import * as path from 'path'

export default function routes(router: Router) {
	router.get('/', serveHomePage)
	router.get('/match/:id', serveMatchPage)
}

async function serveHomePage(req: Request, res: Response) {
	res.send(await ejs.renderFile(path.join(config.appRoot, '../../src/views/home.ejs')))
}

async function serveMatchPage(req: Request, res: Response) {
	const matchData = { team1: 'Team 1', team2: 'Team 2', team1Score: 2, team2Score: 1, maps: [
		{ mapName: 'de_dust2', team1Score: 16, team2Score: 14 },
		{ mapName: 'de_inferno', team1Score: 13, team2Score: 16 },
		{ mapName: 'de_mirage', team1Score: 16, team2Score: 15 }] }
	res.render('match.ejs', matchData)
}
