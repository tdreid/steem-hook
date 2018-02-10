const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send(
    ''.concat(
      process.env.npm_package_name,
      '\n',
      process.env.npm_package_version,
      '\n'
    )
  );
});

module.exports = router;
