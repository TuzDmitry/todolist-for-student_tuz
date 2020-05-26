import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import PropTypes from "prop-types";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";

import axios from 'axios';

import {
    addTaskAC,
    changeTaskAC, changeTodolistAC,
    deleteTaskAC,
    deleteTodolistAC,
    setTasksAC
} from "./reducer";
import api from "./api";


class TodoList extends React.Component {
    nextTaskId = 0;

    componentDidMount() {
        this.restoreState()
    }

    state = {
        tasks: [
            // {id: 1, title: "JS", isDone: true, priority: 'low'},
            // {id: 2, title: "HTML", isDone: true, priority: 'high'},

        ], filterValue: "All"
    }

    restoreState = () => {
        // debugger
        // axios.get(
        //     `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
        //     {
        //         withCredentials: true,
        //         headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
        //     }
        // )
        api.getTasks(this.props.id)
            .then(response => {
                console.log(response)
                // debugger
                if (!response.data.error) {
                    this.props.setTasks(response.data.items, this.props.id)
                }
            })
    }


///// метод, который будет брать текущий стейт и… сохранять его в localStorage
    saveState = () => {
        ////устанавливаем в localStorage под ключом "our-state"  наш стейт переделанный в  джейсон строку JSON.stringify(this.state)
        localStorage.setItem("our-state-" + this.props.id, JSON.stringify(this.state));
    }

//     restoreState = () => {
//         ////объявляем наш стейт стартовый
//         let state = {
//             tasks: [],
//             filterValue: "All"
//         }
//         //// считываем сохраненную ранее строку из localStorage
//         let stateAsString = localStorage.getItem("our-state-" + this.props.id)
//         ////если таковая есть, то превращаем строку в объект и призваиваем стейту знаение из стораджа.
//         if (stateAsString) {
//             state = JSON.parse(stateAsString);
//         }
// ////устанавливаем стейт или пустой или востановленный в стейт
//         this.setState(state, () => {
//             ////одним махом в колбек сделаем сравнение счётчика для id
// // this.nextTaskId = this.state.tasks.length   код который можено заменить на строчки 44-48
//             this.state.tasks.forEach(task => {
//                 if (task.id >= this.nextTaskId) {
//                     this.nextTaskId = task.id + 1
//                 }
//             })
//         })
//     }

    deleteTodolist = () => {

        // axios.delete(
        //     `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
        //     {
        //         withCredentials: true,
        //         headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
        //     }
        // )
        api.deleteTodolist(this.props.id)
            .then(response => {
                // console.log(response)
                if (response.data.resultCode === 0) {
                    // debugger
                    this.props.deleteTodolist(this.props.id)
                }
            })
        ////было....
        // this.props.deleteTodolist(this.props.id)
    }

    addTask = (newText) => {
        debugger
        // axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
        //     {title: newText},
        //     {
        //         withCredentials: true,
        //         headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
        //     }
        // )
        api.createTask(this.props.id, newText)
            .then(response => {
                debugger
                if (response.data.resultCode === 0) {
                    let newTask = response.data.data.item;
                    this.props.addTask(this.props.id, newTask)
                }
            })

        //////было...
        // let newTask = {id: this.props.tasks.length, title: newText, isDone: false, priority: 'low'};
        //
        // this.nextTaskId++;
        // this.props.addTask(this.props.id, newTask)
    }


    deleteTask = (taskId) => {

        // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
        //     {
        //         withCredentials: true,
        //         headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
        //     })

        api.deleteTask(this.props.id, taskId)
            .then(response => {
                // debugger
                if (response.data.resultCode === 0) {
                    this.props.deleteTask(this.props.id, taskId)
                }
            })

        // alert(taskId)
        // this.props.deleteTask(this.props.id, taskId)


    }


    changeFilter = (newfilterValue) => {
        this.setState({filterValue: newfilterValue}, this.saveState);
        // alert(`Hello ${name}`);
    }

    // changeTask = (task, newPropsObj) => {
    //     axios.put(
    //         `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.taskId}`,
    //         {...task, ...newPropsObj},
    //         {
    //             withCredentials: true,
    //             headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
    //         }
    //     ).then(response => {
    //         if (response.data.resultCode === 0) {
    //             // this.props.updateTask(response.)
    //         }
    //     })
    //
    //
    // }

    changeTask = (task, newPropsObj) => {
        // axios.put(
        //     `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.id}`,
        //     {...task, ...newPropsObj},
        //     {
        //         withCredentials: true,
        //         headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
        //     }
        //     )
        // this.props.tasks.forEach(task=)
        api.changeTask(task, newPropsObj)
            .then(response => {
                if (response.data.resultCode === 0) {
                    // debugger
                    // this.props.changeTask(response.data.data.item)
                    this.props.changeTask(response.data.data.item)
                }
            })
    }

    changeStatus = (task, status) => {

        this.changeTask(task, {status: status})

    }

    changeTitle = (task, newtitle) => {
        this.changeTask(task, {title: newtitle})
    }

    changePriority = (task, newPriorityValue) => {
        this.changeTask(task, {priority: newPriorityValue})
    }


    changeTodoTitle = (todolistId, newtitle) => {
        // axios.put(
        //     `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
        //     {title:newtitle},
        //     {
        //         withCredentials: true,
        //         headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
        //     }
        //     )
        api.changeTodoTitle(todolistId, newtitle)
            .then(this.props.changeTodoTitle(todolistId, newtitle))

    }


    render = () => {

        let {tasks = []} = this.props

        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitle title={this.props.title}
                                       id={this.props.id}
                                       changeTodoTitle={this.changeTodoTitle}/>
                        <div>
                            <span className="idTodo">{`# ${this.props.id.slice(0, 4)}`}</span>
                            <button className="deleterTodo" onClick={this.deleteTodolist}>x</button>
                        </div>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks
                        deleteTask={this.deleteTask}
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        changePriority={this.changePriority}

                        tasks={tasks.filter(t => {
                            switch (this.state.filterValue) {
                                case "All":
                                    return true;
                                case "Completed":
                                    return t.status === 2;
                                case "Active":
                                    return t.status === 0;
                                default:
                                    return true;
                            }
                        })}
                    />
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>

            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {

        deleteTodolist: (todolistId) => {
            const action = deleteTodolistAC(todolistId)
            dispatch(action)
        },
        changeTodoTitle: (todolistId, newtitle) => {
            const action = changeTodolistAC(todolistId, newtitle)
            dispatch(action)
        },

        addTask: (todolistId, newTask) => {
            const action = addTaskAC(todolistId, newTask)
            dispatch(action)
        },
        deleteTask: (todolistId, taskId) => {
            const action = deleteTaskAC(todolistId, taskId)
            dispatch(action)
        },
        changeTask: (task) => {
            const action = changeTaskAC(task)
            dispatch(action)
        },
        setTasks: (tasks, todoListId) => {
            dispatch(setTasksAC(tasks, todoListId))
        }
    }
}

const TodolistConnect = connect(null, mapDispatchToProps)(TodoList)

export default TodolistConnect;
// export default TodoList;


