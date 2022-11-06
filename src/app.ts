import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import config from './config'
import path from 'path'

const app = express();
const port = 8000;

/**
 * Trust proxy
 */
app.enable('trust proxy')

/**
 * Serve static public dir
 */
console.log(config.assetsRoot)
app.use('/assets', express.static(config.assetsRoot))

/**
 * Set template engine
 */
app.set('view engine', 'ejs')
app.set('views', path.join(config.appRoot, '../../src/views'))
app.use(cookieParser('secret_cat'))




/**
 * Configure backend to use bodyParser()
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
// app.use(express.json({limit:"1mb"}));


void import('./modules/router.js').then(e => e.default(app))

/**
 * Disable powered by header for security reasons
 */
app.disable('x-powered-by')

/**
 * Start listening on port
 */
 app.listen(port, '127.0.0.1', () => {
	console.log(`[WEB] App is running on: 127.0.0.1:${port}`)
})
