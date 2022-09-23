//CALENDAR -- controller in production
const Calendar = require('../models/Calendar')

module.exports = {
    getCalendar: async (req,res)=>{
        console.log(req.user)
        try{
            const  calendarWatered= await Calendar.find()
            res.render('calendar.ejs', {dayWatered: calendarWatered})
            // res.render('calendar.ejs', {calendarId: calendarItems, user: req.user})
            console.log(req.body)
        }catch(err){
            console.log(err)
        }
    },
    createCalendar: async (req, res)=>{
        try{
            await Calendar.create({calendarId: req.user.id, completed: false, userId: req.user.id, date: req.body.value})
            console.log('calendar has been created!')
            res.redirect('/calendar')
        }catch(err){
            console.log(err)
        }
    },
    markWatered: async (req, res)=>{
        try{
            await Calendar.findOneAndUpdate({_id:req.body.calendarIdFromJSFile},{
                completed: true
            })
            console.log('watering Complete')
            res.json('watering Complete')
        }catch(err){
            console.log(err)
        }
    },
    markUnwatered: async (req, res)=>{
        try{
            await Calendar.findOneAndUpdate({_id:req.body.calendarIdFromJSFile},{
                completed: false
            })
            console.log('watering Incomplete')
            res.json('watering Incomplete')
        }catch(err){
            console.log(err)
        }
    },
    deleteCalendar: async (req, res)=>{
        console.log(req.body.calendarIdFromJSFile)
        try{
            await Calendar.findOneAndDelete({_id:req.body.calendarIdFromJSFile})
            console.log('Deleted calendar')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    