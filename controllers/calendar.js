//CALENDAR -- controller in production
const Todo = require('../models/Calendar')

module.exports = {
    getCalendar: async (req,res)=>{
        console.log(req.user)
        try{
            res.render('calendar.ejs')
            const  calendarItems = await Calendar.find({userId:req.user.id})
            res.render('calendar.ejs', {calendar: calendarItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createCalendar: async (req, res)=>{
        try{
            await Calendar.create({calendar: req.body.calendarItem, completed: false, userId: req.user.id, date: 'string I need to pass in from DOM'})
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