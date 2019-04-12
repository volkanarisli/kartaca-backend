const router = require('express').Router();
const morsefy = require('morsefy');

router.post("/latin-to-morse", (req, res) => {
  let {text} = req.body;

  const morse = morsefy.encode(text);

  morse.includes('/ / /') ? res.send({status: 404}) : res.send(morse)
});

router.post("/morse-to-latin", (req, res) => {
  let {text} = req.body;

  const morse = morsefy.decode(text);

  morse === '' ? res.send({status: 404}) : res.send(morse)
});

module.exports = router;