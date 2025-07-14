const express = require('express');
const router = express.Router();

router.use('/customers', require('./customers'));
router.use('/employees', require('./employees'));
router.use('/services', require('./services'));
router.use('/appointments', require('./appointments'));
router.use('/payments', require('./payments'));
router.use('/time-tracking', require('./timeTracking'));

module.exports = router;
