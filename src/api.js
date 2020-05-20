import axios from "axios";

const instance = axios.create({
    withCredentials: true,
    headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"},
    baseURL: `https://social-network.samuraijs.com/api/1.1/todo-lists/`
})

const api = {
    createTodolist(newTodolistName) {
        return instance.post('',{title: newTodolistName}
        )
    },
    getTodolists() {
        return instance.get('')
    },

    getTasks(todolistId) {
        debugger
        return instance.get(
            `${todolistId}/tasks`,
        )
    },
    createTask(todolistId, newText) {
        return instance.post(`${todolistId}/tasks`,
            {title: newText}
        )
    },
    changeTask(task, newPropsObj) {
        return instance.put(
            `${task.todoListId}/tasks/${task.id}`,
            {...task, ...newPropsObj}
        )
    },
    deleteTodolist(todolistId) {
        return instance.delete(
            `${todolistId}`
        )
    },
    deleteTask(todolistId,taskId){
        return instance.delete(`${todolistId}/tasks/${taskId}`
            )
    }


}

export default api;