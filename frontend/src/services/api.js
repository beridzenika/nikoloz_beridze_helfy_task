
const BACK_URL = 'http://localhost:4000/api/tasks'; 

//get
export const getTasks = async () => {
  const res = await fetch(BACK_URL);
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

//post
export const createTask = async (taskData) => {
  const res = await fetch(BACK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

//update
export const updateTask = async (id, taskData) => {
  const res = await fetch(`${BACK_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

//delete
export const deleteTask = async (id) => {
  const res = await fetch(`${BACK_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete task');
};

//toggle
export const toggleTask = async (id, completed) => {
  const res = await fetch(`${BACK_URL}/${id}/toggle`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed }),
  });
  if (!res.ok) throw new Error('Failed to toggle task');
  return res.json();
};