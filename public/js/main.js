const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}
//CALENDAR -- all new might not work

const calendarItem = document.querySelectorAll('span.not')
const calendarComplete = document.querySelectorAll('span.completed')



Array.from(calendarItem).forEach((el)=>{
    el.addEventListener('click', markWatered)
})

Array.from(calendarComplete).forEach((el)=>{
    el.addEventListener('click', markUnwatered)
})

async function deleteCalendar(){
    const calendarId = this.parentNode.dataset.id
    try{
        const response = await fetch('calendar/deleteCalendar', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'calendarIdFromJSFile': calendarId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markWatered(){
    const calendarId = this.parentNode.dataset.id
    try{
        const response = await fetch('calendar/markWatered', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'calendarIdFromJSFile': calendarId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markUnwatered(){
    const calendardoId = this.parentNode.dataset.id
    try{
        const response = await fetch('calendar/markCalendar', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'calendarIdFromJSFile': calendardoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

//JS FOR EJS
//CALENDAR
let nav = 0;
let clicked = null;
// this wont work here ??DELETE?? let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : [];

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const calendar = document.getElementById('calendar');

function load() {
    const dt = new Date();

    if(nav !== 0){
        dt.setMonth(new Date().getMonth() + nav);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

    document.getElementById('monthDisplay').innerText = 
    `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`

    calendar.innerHTML = '';
    
    for(let i = 1; i <= paddingDays + daysInMonth; i++){
        const daySquare = document.createElement('form')
        daySquare.classList.add('day');
        daySquare.setAttribute("value", `${i - paddingDays} ${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`);
        daySquare.setAttribute("name", `${i - paddingDays} ${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`);
        daySquare.setAttribute("action", '/calendar/createCalendar');
        daySquare.setAttribute("method", 'POST');
        

        if(i > paddingDays){
            daySquare.innerHTML = `${i - paddingDays} <input name='value' value='${i - paddingDays} ${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}'> <input type="submit">`;
            
            daySquare.addEventListener('click', () => {
                console.log('click');
                function turnBlue(){
                    if(daySquare.classList.contains('blueDay')){
                        daySquare.classList.remove('blueDay');
                    }else{
                        daySquare.classList.add('blueDay');
                    }
                    
                };
                turnBlue();
            })
        }else{
            daySquare.classList.add('padding');
        }

        calendar.appendChild(daySquare)
    }
}

function initButtons(){
    document.getElementById('nextButton').addEventListener('click', ()=> {
        nav++;
        load();
    });
    document.getElementById('backButton').addEventListener('click', ()=> {
        nav--;
        load();
    });
}

initButtons();
load();