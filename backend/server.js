const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// batabase array
const tasks = [
    { 
        id: 1, 
        title: 'the title', 
        description: 'this is the description',
        completed: true,
        createdAt: '3/26/2026',
        priority: 'low' 
    },
    { 
        id: 2, 
        title: 'the second', 
        description: 'this is defenetly the description',
        completed: false,
        createdAt: '3/25/2026',
        priority: 'high' 
    }
];

// routers
const taskRouter = require('./routes/tasks')(tasks);
app.use('/api/tasks', taskRouter);
    


app.listen(4000, () => {
    console.log("server running on port 4000");
});