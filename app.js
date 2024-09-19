//Call all modules used
const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")
const app = express()
const path = require("path")

//middleware
app.use(bodyParser.urlencoded({extended: true})) //parses response object data 
app.use(express.static("public")) //declares css folder as "public"
app.set("view engine", "ejs") //sets view engine to ejs

//load tasks from json file with fs and json
const getTasks = () => {
    const data = fs.readFileSync("./data/tasks.json", "utf8")
    return JSON.parse(data)
}
// saves tasks to tasks file, using fs and json stringify
const saveTasks = (tasks) => {
    fs.writeFileSync("./data/tasks.json", JSON.stringify(tasks, null, 2))
}
// appends event registered to data.txt file with fs and json
const regEvent = (event) => {
    fs.appendFileSync("./data/data.txt", JSON.stringify(event, null, 2))
}
//Routes

//get: show all tasks on admin page
app.get("/", (req, res) => {
    const tasks = getTasks() //declares var tasks as getTasks func
    res.render("admin", {tasks}) //renders admin page with tasks object
})

//show all tasks on user page
app.get("/events", (req, res) =>{
    const tasks = getTasks() 
    res.render("events", {tasks}) 
})

//post: make new task
app.post("/tasks", (req, res) =>{
    const tasks = getTasks()
    const newTask = { //create new task object 
        id: tasks.length+1, //add 1 to current highest id
        name: req.body.name, //declares name, date, desc with info from form
        date: req.body.date,
        description: req.body.description
    }
    tasks.push(newTask) // push new task object to task func, into tasks.json
    saveTasks(tasks) //update task variable 
    res.redirect("/") //redirect to reload page and see update
})

//register for event
app.post("/events", (req, res) =>{
    const reg = { // create new user registration object and repeat above steps, pushing to data.txt file
        EventId: req.body.id,
        name: req.body.name,
        email: req.body.email
    }
    regEvent(reg)
    res.redirect("/events")
})

//Update any task
app.get("/tasks/:id/edit", (req, res)=>{
    const tasks = getTasks()
    const task = tasks.find(task => task.id == req.params.id) //use .find to pull task with matching id as user input
    res.render("tasks", {task}) //render tasks page with specified task
})

//PUT: view any task
app.post("/tasks/:id", (req, res) =>{
    const tasks = getTasks()
    const taskIndex = tasks.findIndex(task => task.id == req.params.id) // pull task with findIndex to view specific task
    tasks[taskIndex].description = req.body.description
    tasks[taskIndex].name = req.body.name
    tasks[taskIndex].date = req.body.date
    saveTasks(tasks)
    res.redirect("/")
})

//delete a task
app.post("/tasks/:id/delete", (req, res) =>{
    let tasks = getTasks()
    tasks = tasks.filter(task => task.id != req.params.id) //filter out all tasks that do not have matching id
    saveTasks(tasks) //save all filtered tasks
    res.redirect("/")
})

// listen on server 5000 and respond when listening
app.listen(5000, ()=>{
    console.log(`Listening on port ${5000}`)
})