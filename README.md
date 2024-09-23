
# Event Manager EJS

This is a event manager using EJS. Their is an admin page and user page, users can register for events. Administrators can alter, add, or delete events, and see event the total users registered for each event. The software can be used for anyone needing an event registration tool.







## Dependencies

```bash
    npm install ejs, fs, express
```

## Dev Dependencies:

```bash
  npm i nodemon
  npm run dev
```
## Deployment
- Download Github .zip file
- Extract folder and open in code editor
- Install dependencies V
- ```bash 
    npm i
    node app.js
- Server running on http://localhost:5000/ (admin)
- http://localhost:5000/events (user)







## Usage/Examples

```javascript
    const getTasks = () => {//Function to pull tasks from data file
        const data = fs.readFileSync("./data/tasks.json", "utf8")
        return JSON.parse(data) // returns data in readable format
    }
    const saveTasks = (tasks) => { // Saves new data to data files
        fs.writeFileSync("./data/tasks.json", 
        JSON.stringify(tasks, null, 2))
    }
    const regEvent = (event) => {
        fs.appendFileSync("./data/data.txt", 
        JSON.stringify(event, null, 2))
    }

    //GET: show all tasks on admin page
    app.get("/", (req, res) => {
        const tasks = getTasks() //declares var tasks as getTasks func
        res.render("admin", {tasks}) //renders admin page with tasks   object
    )}
    //POST: make new task
    app.post("/tasks", (req, res) =>{
        const tasks = getTasks()
        const newTask = { //create new task object 
            id: tasks.length+1,
            name: req.body.name, //declares name, date, desc with info from form
            date: req.body.date,
            description: req.body.description
        }
        tasks.push(newTask) // push new task object to task func, into tasks.json
        saveTasks(tasks) //update task variable 
        res.redirect("/") //redirect to reload page and see update
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
        tasks = tasks.filter(task => task.id != req.params.id) //      filter out all tasks that do not have matching id
        saveTasks(tasks) //save all filtered tasks
        res.redirect("/")
    })

    
```

## Contribute

Contact oakuopus@gmail.com

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Version
Version 1.0 as of 2024/9/23/14/41


