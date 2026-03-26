const express = require('express');

const app = express();
app.use(express.json());

// batabase array
const tasks = [{ 
    id: 1, 
    title: 'the title', 
    description: 'this is the description',
    completed: true,
    createdAt: '3/26/2026',
    priority: 'low' }];

// routers
const taskRouter = require('./routes/tasks')(tasks);
app.use('/api/tasks', taskRouter);
    


app.listen(4000, () => {
    console.log("server running on port 4000");
});