const { body, validationResult } = require('express-validator');

router.post('/posts', [
  body('name').notEmpty().isString(),
  body('message').notEmpty().isString(),
  body('username').notEmpty().isString(),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // Process the request further
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
  