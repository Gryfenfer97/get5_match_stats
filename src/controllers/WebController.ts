import { Request, Response, Router } from 'express'
import config from '../config'
import { getMatchs, getMatchFromId, getMap, getDemoUrl } from '../modules/match'

export default function routes(router: Router) {
	router.get('/', serveHomePage)
	router.get('/match/:id', serveMatchPage)
	router.get('/match/:matchid/map/:mapnumber', serveMapPage)
}

async function serveHomePage(_req: Request, res: Response) {
	res.render('home.ejs', {application_name: process.env.APPLICATION_NAME, stages: await getMatchs()})

}

async function serveMatchPage(req: Request, res: Response) {
	const matchData = await getMatchFromId(parseInt(req.params.id))

	res.render('match.ejs', {application_name: process.env.APPLICATION_NAME, ...matchData})
}

async function serveMapPage(req: Request, res: Response) {
	const match = await getMap(parseInt(req.params.matchid), parseInt(req.params.mapnumber))
	res.render('map.ejs', {application_name: process.env.APPLICATION_NAME, demo_url: await getDemoUrl(match.matchid, match.map.mapnumber, match.map.mapname), ...match, enable_demo: config.enable_demo})
}