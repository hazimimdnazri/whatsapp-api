const express = require('express')
let app = express.Router()

app.get('/', (req, res) => {
    var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
    console.log(`Connection from ${ip}`)
    res.send('It is working!')
});

app.post('/testapi', (req, res) => {
    console.log(req.body)
    res.status(200).json({status : 'success', message : 'API reachable'})
})

module.exports = app;