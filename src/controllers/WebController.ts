import config from '../config'
import { Request, Response, Router } from 'express'
import path from 'path'
import { getMatchs, getMaps, getMap } from '../modules/match'

export default function routes(router: Router) {
	router.get('/', serveHomePage)
	router.get('/match/:id', serveMatchPage)
	router.get('/match/:matchid/map/:mapnumber', serveMapPage)
}

async function serveHomePage(_req: Request, res: Response) {
	res.render('home.ejs', {application_name: process.env.APPLICATION_NAME, matches: await getMatchs()})

}

async function serveMatchPage(req: Request, res: Response) {
	const matchData = await getMaps(parseInt(req.params.id))

	res.render('match.ejs', {application_name: process.env.APPLICATION_NAME, ...matchData})
}

async function serveMapPage(req: Request, res: Response) {
	const match = await getMap(parseInt(req.params.matchid), parseInt(req.params.mapnumber))
	if(!process.env.DEMOS_BASE_URL) throw Error('no base url setup for demos')
	const demo_url = path.join(process.env.DEMOS_BASE_URL, `${match.matchid}_map${match.map.mapnumber}_${match.map.mapname}.dem`)
	res.render('map.ejs', {application_name: process.env.APPLICATION_NAME, demo_url, ...match, enable_demo: config.enable_demo})
}