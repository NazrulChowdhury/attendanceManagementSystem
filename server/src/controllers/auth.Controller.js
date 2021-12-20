require('dotenv').config()

const logout = (req, res) => {
  req.logout()
  req.session.destroy((err) => {
   // res.clearCookie('connect.sid')
    res.send(false)
  })
}
module.exports = {logout}