import { Request, Response, Router } from 'express'
import { getMatchs } from '../modules/match'

export default function routes(router: Router) {
	router.get('/matchs', handleMatchs)
}

async function handleMatchs(req: Request, res: Response){
	res.json(await getMatchs())
}