const router = require('express').Router();

application.get('home', (req, res) => {
  res.sendFile(path.join(__dirname, './frontend/index.html'));
});

module.exports = router;
