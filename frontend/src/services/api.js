
const Back_URL = 'http://localhost:4000/api/tasks'; 

//get
export const getTasks = async () => {
    try {
        const res = await fetch (Back_URL);
        if(!res.ok) {
            throw new Error("failed to fech tasks");
        }
        return res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

//post
export const createTask = async (taskData) => {
    try {
        const res = await fetch (Back_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(taskData)
        });
        if(!res.ok) {
            throw new Error("failed to create a task");
        }
        return res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

//update
export const updateTask = async (id, taskData) => {
    try {
        const res = await fetch(`${Back_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(taskData)
        });
        if (!res.ok) {
            throw new Error("failed to edit the task");
        }
        return res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

//delete
export const deleteTask = async (id) => {
    try {
        const res = await fetch(`${Back_URL}/${id}`, {
            method: 'DELETE'
        });
        if (!res.ok) {
            throw new Error("failed to delete the task");
        }
        return res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}

//toggle
export const toggleTask = async (id) => {
    try {
        const res = await fetch(`${Back_URL}/${id}/toggle`, {
            method: 'PATCH',
        });
        if (!res.ok) {
            throw new Error("failed to toggle the task");
        }
        return res.json();
    } catch (err) {
        console.error(err);
        return null;
    }
}