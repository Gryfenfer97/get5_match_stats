import path from 'path'
import * as dotenv from 'dotenv'
dotenv.config()

const appRoot = path.join(process.cwd(), 'dist/server')
const assetsRoot  = path.join(process.cwd(), 'assets')

export default {
    appRoot,
    assetsRoot,
    env: process.env
}

