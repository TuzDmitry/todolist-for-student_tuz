import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import PropTypes from "prop-types";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";

// import axios from 'axios';

import {
     changeTodolist, deleteTodolist,
    getTasks, addTask, deleteTask, changeTask
} from "./reducer";
import Preloader from "./Preloader";


class TodoList extends React.Component {

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        // вызов колбека который нам предоставил connect для вызова санки
        this.props.getTasks(this.props.id)
    }


    state = {
        tasks: [
            // {id: 1, title: "JS", isDone: true, priority: 'low'},
            // {id: 2, title: "HTML", isDone: true, priority: 'high'},

        ], filterValue: "All"
    }


    deleteTodolist = () => {
        // вызов колбека который нам предоставил connect для вызова санки
        this.props.deleteTodolist(this.props.id)

    }

    changeTodoTitle = (todoListId, newtitle) => {
        // вызов колбека который нам предоставил connect для вызова санки
        this.props.changeTodolist(todoListId, newtitle)
    }

    addTask = (newText) => {
        // вызов колбека который нам предоставил connect для вызова санки
        this.props.addTask(this.props.id, newText)
    }


    deleteTask = (taskId) => {
        // axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
        //     {
        //         withCredentials: true,
        //         headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
        //     })

        // api.deleteTask(this.props.id, taskId)
        //     .then(response => {
        //         // debugger
        //         if (response.data.resultCode === 0) {
        //             this.props.deleteTask(this.props.id, taskId)
        //         }
        //     })

        // вызов колбека который нам предоставил connect для вызова санки
        this.props.deleteTask(this.props.id, taskId)
    }


    changeFilter = (newfilterValue) => {
        this.setState({filterValue: newfilterValue}, this.saveState);
    }



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
        // api.changeTask(task, newPropsObj)
        //     .then(response => {
        //         if (response.data.resultCode === 0) {
        //             // debugger
        //             // this.props.changeTask(response.data.data.item)
        //             this.props.changeTask(response.data.data.item)
        //         }
        //     })
        // вызов колбека который нам предоставил connect для вызова санки
        this.props.changeTask(task, newPropsObj)
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
                    <Preloader isPreloader={this.props.isPreloaderTasks}/>
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

const mapStateToProps = (state) => {
    return {
        isPreloaderTasks: state.todoPage.isPreloaderTasks
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return {
//         deleteTodolist: (todoListId) => {
//             const thunk = deleteTodolist(todoListId)
//             dispatch(thunk)
//         },
//         changeTodolist: (todoListId, newtitle) => {
//             const thunk = changeTodolist(todoListId, newtitle)
//             dispatch(thunk)
//         },
//
//
//
//         getTasks: (todoListId) => {
//             const thunk=getTasks(todoListId)
//             dispatch(thunk)
//         },
//         addTask: (todoListId, newText) => {
//             const thunk = addTask(todoListId, newText)
//             dispatch(thunk)
//         },
//         deleteTask: (todoListId, taskId) => {
//             const thunk = deleteTask(todoListId, taskId)
//             dispatch(thunk)
//         },
//         changeTask: (task, newPropsObj) => {
//             const thunk = changeTask(task, newPropsObj)
//             dispatch(thunk)
//         }
//     }
// }

// const TodolistConnect = connect(mapStateToProps, mapDispatchToProps)(TodoList)

const TodolistConnect = connect(mapStateToProps,
    {deleteTodolist,changeTodolist,
        getTasks,addTask, deleteTask,changeTask}
        )(TodoList)

export default TodolistConnect;
// export default TodoList;


