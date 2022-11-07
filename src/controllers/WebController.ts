import { Request, Response, Router } from 'express'
import { getMatchs, getMaps, getMap } from '../modules/match'

export default function routes(router: Router) {
	router.get('/', serveHomePage)
	router.get('/match/:id', serveMatchPage)
	router.get('/match/:matchid/map/:mapnumber', serveMapPage)
}

async function serveHomePage(_req: Request, res: Response) {
	res.render('home.ejs', {matches: await getMatchs()})

}

async function serveMatchPage(req: Request, res: Response) {
	const matchData = await getMaps(parseInt(req.params.id))
	res.render('match.ejs', matchData)
}

async function serveMapPage(req: Request, res: Response) {
	const match = await getMap(parseInt(req.params.matchid), parseInt(req.params.mapnumber))
	res.render('map.ejs', match)
}