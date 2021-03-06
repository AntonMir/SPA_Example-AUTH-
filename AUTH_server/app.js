const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const chalk = require('chalk')
var cors = require('cors')
require('module-alias/register')

const app = express()

const port = process.env.PORT || config.get('port') || 8000

app.use(cors(config.get('corsOptions')))

app.use(express.json({ extended: true }))

app.use('/api/auth', require('@routes/auth.routes.js'))

async function start() {
    try {
        // if connect to MongoDB success, run server
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
        app.listen(port, () => console.log(chalk.magenta(`>>> AUTH server listen http://localhost:${port}`)))
    } catch (e) {
        console.log('Server Error:', e.message)
        process.exit(1)
    }
}

start()
