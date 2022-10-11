// Megan Logger
function megan (req, res, next) {
  const {method, url} = req
  console.log(`* ${method} -> ${url}`)
  if(method === "POST"){
    if(req.body){
      console.log(`** BODY: ${JSON.stringify(req.body)}`)
    }
  }
  next()
}

module.exports = megan;