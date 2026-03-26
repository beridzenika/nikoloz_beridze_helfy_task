
const Back_URL = 'http://localhost:4000/api/tasks'; 

export const getTasks = async () => {
    try {
        const res = await fetch (Back_URL);
        if(!res.ok) {
            throw new Error("failed to fech");
        }
        return res.json();
    } catch (err) {
        console.error(err);
        return[];
    }
}