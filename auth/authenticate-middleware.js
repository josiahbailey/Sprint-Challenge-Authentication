/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

module.exports = (req, res, next) => {
  const { authentication } = req.headers
  if (authentication) {

  } else {
    res.status(401).json({ you: 'shall not pass!' });
  }
};
