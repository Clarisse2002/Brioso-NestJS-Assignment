const express = require('express');
const router = express.Router();
const { getFibonacciSequence } = require('../controller/Assignment1controller');

router.get('/fibonacci/:num', (req, res) => {
    const num = parseInt(req.params.num);
    const result = getFibonacciSequence(num);

    if (result.error) {
        return res.status(400).json(result);
    }

    res.json(result);
});

module.exports = router;
