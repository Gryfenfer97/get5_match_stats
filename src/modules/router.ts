import { Express, Router } from 'express'
import ApiController from '../controllers/ApiController'
import WebController from '../controllers/WebController'


const apiRouter = Router()
const webController = Router()

export default function( app: Express ) {

	ApiController(apiRouter)
	app.use('/api', apiRouter)

	WebController(webController)
	app.all('*', webController)
}