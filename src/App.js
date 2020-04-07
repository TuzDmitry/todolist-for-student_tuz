import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import PropTypes from "prop-types";

class App extends React.Component {
    nextTaskId = 0;

    componentDidMount() {
        this.restoreState()
    }

    state = {
        tasks: [
            // {id: 1, title: "JS", isDone: true, priority: 'low'},
            // {id: 2, title: "HTML", isDone: true, priority: 'high'},
            // {id: 3, title: "CSS", isDone: true, priority: 'low'},
            // {id: 4, title: "SaSS", isDone: false, priority: 'high'},
            // {id: 5, title: "React", isDone: false, priority: 'low'},
        ], filterValue: "All"
    }

    saveState = () => {
        ////джейсон прими наш стейт JSON.stringify(this.state)
        localStorage.setItem("our-state", JSON.stringify(this.state));
    }

    restoreState = () => {
        let state = {
            tasks: [],
            filterValue: "All"
        }
        let stateAsString = localStorage.getItem("our-state")
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }

        this.setState(state, () => {
            this.state.tasks.forEach(task => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1
                }
            })
        })
    }

    addTask = (newText) => {
        let newTask = {id: this.nextTaskId, title: newText, isDone: false, priority: 'low'};
        this.nextTaskId++;
        let newTasks = [...this.state.tasks, newTask] ///...this.state.tasks-- раскукоживаем старый массив
        this.setState({
            tasks: newTasks
        }, this.saveState) ///setState- метод реагирующий на изменение св-ва state

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

        this.setState({tasks: newTasks}, () => {
            this.saveState()
        });
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }

    changeTitle = (taskId, newtitle) => {
        this.changeTask(taskId, {title: newtitle})
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
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks
                        changeTitle={this.changeTitle}
                        changeStatus={this.changeStatus}
                        tasks={this.state.tasks.filter(t => {
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
                            }
                        )}/>
                    <TodoListFooter changeFilter={this.changeFilter} filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

// App.propTypes = {
//     // _________: PropTypes.string
// };
