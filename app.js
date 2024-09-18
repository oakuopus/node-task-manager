const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")
const app = express()
const PORT = 5000
const path = require("path")

//middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("view engine", "ejs")

//load tasks from json file
const getTasks = () => {
    const data = fs.readFileSync("./data/tasks.json", "utf8")
    return JSON.parse(data)
}
const saveTasks = (tasks) => {
    fs.writeFileSync("./data/tasks.json", JSON.stringify(tasks, null, 2))
}

//Routes

//get: show all tasks
app.get("/", (req, res) => {
    const tasks = getTasks()
    res.render("admin", {tasks})
})

app.get("/events", (req, res) =>{
    const tasks = getTasks()
    res.render("events", {tasks})
})

//post: make new task
app.post("/tasks", (req, res) =>{
    const tasks = getTasks()
    const newTask = {
        id: tasks.length+1,
        name: req.body.name,
        date: req.body.date,
        description: req.body.description
    }
    tasks.push(newTask)
    saveTasks(tasks)
    res.redirect("/")
})

// get on task
app.get("/tasks/:id/edit", (req, res)=>{
    const tasks = getTasks()
    const task = tasks.find(task => task.id == req.params.id)
    res.render("tasks", {task})
})

//PUT: update current task
app.post("/tasks/:id", (req, res) =>{
    const tasks = getTasks()
    const taskIndex = tasks.findIndex(task => task.id == req.params.id)
    tasks[taskIndex].description = req.body.description
    tasks[taskIndex].name = req.body.name
    tasks[taskIndex].date = req.body.date6
    saveTasks(tasks)
    res.redirect("/")
})


app.post("/tasks/:id/delete", (req, res) =>{
    let tasks = getTasks()
    tasks = tasks.filter(task => task.id != req.params.id)
    saveTasks(tasks)
    res.redirect("/")
})

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`)
})