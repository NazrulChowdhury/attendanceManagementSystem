require('dotenv').config()

const auth = (req,res) => {
  res.send('hello from home controller')
}
const logout = (req, res) => {
  req.logout()
  res.send(false)
}
module.exports = {auth, logout}