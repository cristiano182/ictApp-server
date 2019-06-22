'use strict'
const app = require('express')()
const server = require('http').createServer(app)
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config');
require('./src/config/database')


// MIDDLEWARES
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


 // ROUTES
 app.get('/', (req,res) => res.send('home'))
 app.use(require('./src/routes/users'))
 app.use(require('./src/routes/files'))

 

 app.set('port', process.env.PORT || 3000)

 server.listen(app.get('port'), () =>{
    console.log('Server on port', app.get('port'))
 })
