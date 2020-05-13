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
    changeTaskAC,
    deleteTaskAC,
    deleteTodolistAC,
    setTasksAC
} from "./reducer";


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
        debugger
        axios.get(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
            }
        ).then(response => {
            console.log(response)
            debugger
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

        axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
            }
        )
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


        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {title: newText},
            {
                withCredentials: true,
                headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
            }
        ).then(response => {
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
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId},
        {withCredentials: true,
                headers:{"API-KEY":"99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
            }`)
            .then(response => {
                if (response.data.resultCode === 0) {
                    this.props.deleteTask(this.props.id, taskId)
                }
            })


        // alert(taskId)
        this.props.deleteTask(this.props.id, taskId)


    }




    changeFilter = (newfilterValue) => {
        this.setState({filterValue: newfilterValue}, this.saveState);
        // alert(`Hello ${name}`);
    }

    changeTask = (task, newPropsObj) => {
        axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${task.taskId}`,
            {...task, ...newPropsObj},
            {
                withCredentials: true,
                headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
            }
        ).then(response => {
            if (response.data.resultCode === 0) {
                // this.props.updateTask(response.)
            }
        })


        // let newTasks = this.state.tasks.map(t => {
        //     if (t.id !== taskId) {
        //         return t
        //     } else {
        //         return {...t, ...newPropsObj}
        //     }
        // });

    }

    changeStatus = (taskId, isDone) => {
        this.props.changeTask(this.props.id, taskId, {isDone: isDone})
    }

    changeTitle = (taskId, newtitle) => {
        this.props.changeTask(this.props.id, taskId, {title: newtitle})
    }
// changeTitle=(taskId, newtitle)=>{
//     let newTasks = this.state.tasks.map(t=>{
//         if (t.id!==taskId){return t}
//         else {return {...t, title: newtitle}}
//     });
//
//     this.setState({tasks: newTasks});
// }


    render = () => {

        let {tasks = []} = this.props

        return (
            <div className="App">
                <div className="todoList">
                    <div className="todoList-header">
                        <TodoListTitle title={this.props.title}/>
                        <div>
                            <span className="idTodo">{`# ${this.props.id}`}</span>
                            <button className="deleterTodo" onClick={this.deleteTodolist}>x</button>
                        </div>
                        <AddNewItemForm addItem={this.addTask}/>
                    </div>
                    <TodoListTasks
                        deleteTask={this.deleteTask}
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
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
                            // if(this.state.filterValue==="All"){return true}
                            // if(this.state.filterValue==="Completed"){return t.isDone}
                            // if(this.state.filterValue==="Active"){return t.isDone===false}
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
        addTask: (todolistId, newTask) => {
            const action = addTaskAC(todolistId, newTask)
            dispatch(action)
        },
        deleteTask: (todolistId, taskId) => {
            const action = deleteTaskAC(todolistId, taskId)
            dispatch(action)
        },
        changeTask: (todolistId, taskId, newPropsObj) => {
            const action = changeTaskAC(todolistId, taskId, newPropsObj)
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


