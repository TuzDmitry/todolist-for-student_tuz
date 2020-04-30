import React from 'react';
import './App.css';
import AddNewItemForm from "./AddNewItemForm";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import PropTypes from "prop-types";
import TodoListTitle from "./TodoListTitle";
import {connect} from "react-redux";

export const DELETE_TODOLIST = "DELETE-TODOLIST";
export const DELETE_TASK = "DELETE-TASK";
export const ADD_TASK = "ADD_TASK"
export const CHANGE_TASK = "CHANGE_TASK"


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
///// метод, который будет брать текущий стейт и… сохранять его в localStorage
    saveState = () => {
        ////устанавливаем в localStorage под ключом "our-state"  наш стейт переделанный в  джейсон строку JSON.stringify(this.state)
        localStorage.setItem("our-state-" + this.props.id, JSON.stringify(this.state));
    }

    restoreState = () => {
        ////объявляем наш стейт стартовый
        let state = {
            tasks: [],
            filterValue: "All"
        }
        //// считываем сохраненную ранее строку из localStorage
        let stateAsString = localStorage.getItem("our-state-" + this.props.id)
        ////если таковая есть, то превращаем строку в объект и призваиваем стейту знаение из стораджа.
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }
////устанавливаем стейт или пустой или востановленный в стейт
        this.setState(state, () => {
            ////одним махом в колбек сделаем сравнение счётчика для id
// this.nextTaskId = this.state.tasks.length   код который можено заменить на строчки 44-48
            this.state.tasks.forEach(task => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1
                }
            })
        })
    }

    addTask = (newText) => {
        debugger
        let newTask = {id: this.props.tasks.length, title: newText, isDone: false, priority: 'low'};
        this.nextTaskId++;
        this.props.addTask(this.props.id, newTask)
        // let newTasks = [...this.state.tasks, newTask] ///...this.state.tasks-- раскукоживаем старый массив
        // this.setState({
        //     tasks: newTasks
        // }, this.saveState) ///setState- метод реагирующий на изменение св-ва state

    }
////////мой метод удаления таски
    deletTask = (taskId) => {
        ///скопировали массив тасок в новую переменную
        let newTasks = [...this.state.tasks];
        ///убираем таску которую хотим удалить
        newTasks = newTasks.filter(t => t.id !== taskId)
        ///уменьшили переменную для следующего id
        this.nextTaskId--;
        ////переписали массив тасок с актуальными id
        newTasks = newTasks.map((t, i) => {
            return {...t, id: i}
        })
        this.setState({
            tasks: newTasks
        }, this.saveState) ///setState- метод реагирующий на изменение св-ва state

    }

    deleteTask = (taskId) => {
        // alert(taskId)
        this.props.deleteTask(this.props.id, taskId)
    }

    deleteTodolist = () => {
        this.props.deleteTodolist(this.props.id)
    }


    changeFilter = (newfilterValue) => {
        this.setState({filterValue: newfilterValue}, this.saveState);
        // alert(`Hello ${name}`);
    }

    changeTask = (taskId, newPropsObj) => {
        let newTasks = this.state.tasks.map(t => {
            if (t.id !== taskId) {
                return t
            } else {
                return {...t, ...newPropsObj}
            }
        });
        // this.props.changeTask

        // this.setState({tasks: newTasks}, () => {
        //     this.saveState()
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
                        tasks={this.props.tasks.filter(t => {
                            switch (this.state.filterValue) {
                                case "All":
                                    return true;
                                case "Completed":
                                    return t.isDone;
                                case "Active":
                                    return (!t.isDone);
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


// const mapStateToProps = (state) => {
//     return {
//
//     }
// }

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (todolistId, newTask) => {
            const action = {
                type: ADD_TASK,
                todolistId: todolistId,
                newTask: newTask
            }
            debugger
            dispatch(action)
        },
        changeTask: (todolistId, taskId, newPropsObj) => {
            const action = {
                type: CHANGE_TASK,
                todolistId: todolistId,
                taskId: taskId,
                newPropsObj: newPropsObj

            }
            // debugger
            dispatch(action)
        },
        deleteTodolist: (todolistId) => {
            const action = {
                type: DELETE_TODOLIST,
                todolistId: todolistId
            }
            // debugger
            dispatch(action)
        },
        deleteTask: (todolistId, taskId) => {
            //передали номер ЛИста и номер таски
            // alert(`listID -${todolistId}. taskId ${taskId}`)
            const action = {
                type: DELETE_TASK,
                todolistId: todolistId,
                taskId: taskId
            }
            dispatch(action)
        }
    }
}

const TodolistConnect = connect(null, mapDispatchToProps)(TodoList)

export default TodolistConnect;
// export default TodoList;


