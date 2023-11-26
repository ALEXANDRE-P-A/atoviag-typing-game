const passport = require("passport");
let initialize, authenticate, authorize;

initialize = _ => {
  return [
    passport.initialize(),
    passport.session(),
    (req, res, next) => {
      if(req.user)
        res.local.user = req.user;
      next();
    }
  ];
};

module.exports = {
  initialize,
  authenticate,
  authorize
};