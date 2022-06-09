const authorization = (req, res, next) => {
    var token = req.header('api-key')
    if(token === process.env.TOKEN){
        console.log('success')
        next()
    } else {
        res.status(401).json({status : 'error', message : 'Authentication fail.'})
    }
}
  
module.exports = authorization