const express = require('express');
const router = express.Router();
const { getFactorial } = require('../controller/Assignment3controller');

router.get('/factorial/:number', (req, res) => {
    const number = parseInt(req.params.number);
    const result = getFactorial(number);
    if (result.error) {
        return res.status(400).json(result);
    }
    res.json(result);
});
module.exports = router;
