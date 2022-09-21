//CALENDAR -- new routes file - in production
const express = require('express')
const router = express.Router()
const calendarController = require('../controllers/calendar') 
const { ensureAuth } = require('../middleware/auth')

router.get('/', ensureAuth, calendarController.getCalendar)

router.post('/createCalendar', calendarController.createCalendar)

router.put('/markWatered', calendarController.markWatered)

router.put('/markUnwatered', calendarController.markUnwatered)
//not sure if I want delete calendar or delete watered yet so come back and fix this
router.delete('/deleteCalendar', calendarController.deleteCalendar)

module.exports = router