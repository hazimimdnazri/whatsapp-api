const express = require('express')
let app = express.Router()

// app.get('/', (req, res) => {
//     var ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress 
//     console.log(`Connection from ${ip}`)
//     res.send('It is working!')
// });

app.post('/testapi', (req, res) => {
    res.status(200).json({status : 'success', message : 'API reachable'})
})

app.post('/send/:phone', async (req,res) => {
    let phone = req.params.phone
    let message = req.body.message
    const chatId = phone.substring(1) + "@c.us";
    client.sendMessage(chatId, message).then((response) => {
        res.status(200).json({
            status: 'success',
            response: 'Message successfully sent.'
        });
    }).catch(err => {
        res.status(500).json({ status: false, response: 'Error!' });
    });
});

module.exports = app;