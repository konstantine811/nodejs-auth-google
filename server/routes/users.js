const router = require("express-promise-router")();
const UsersController = require("../controllers/users");
const passport = require("passport");
const passportConf = require("../passport");

const { validateBody, schemas } = require("../helpers/routeHelpers");
const passportSignIn = passport.authenticate("local", { session: false });
const passportJWT = passport.authenticate("jwt", { session: false });
const validate = validateBody(schemas.authSchema);

router.route("/signup").post(validate, UsersController.signUp);

router.route("/signin").post(validate, passportSignIn, UsersController.signIn);

router.route("/secret").get(passportJWT, UsersController.secret);

module.exports = router;
