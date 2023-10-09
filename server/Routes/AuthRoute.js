const router = require("express").Router();
const { Signup, Login  } = require("../Controllers/AuthController");
const {userVerification} = require("../Middlewares/AuthMiddleware")

// Handle GET requests for the /signup route
// Handle POST requests for the /signup route
router.post('/signup', Signup);
router.post('/',userVerification)

// Handle POST requests for the /login route
router.post('/login', Login);

module.exports = router;
