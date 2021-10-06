require('dotenv').config()

const auth = (req,res) => {
  res.send('hello from home controller')
}
const logout = (req, res) => {
  req.logout(() => res.send('SUCCESS'))
}
module.exports = {auth, logout}