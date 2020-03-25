import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import PropTypes from "prop-types";

class App extends React.Component {

    state = {
        tasks: [
            {title: "JS", isDone: true, priority: 'low'},
            {title: "HTML", isDone: true, priority: 'high'},
            {title: "CSS", isDone: true, priority: 'low'},
            {title: "SaSS", isDone: false, priority: 'high'},
            {title: "React", isDone: false, priority: 'low'},
        ], filterValue: "All"
    }



    addTask = (newText) => {
        let newTask = {title: newText, isDone: false, priority: 'low'};
        let newTasks = [...this.state.tasks, newTask] ///...this.state.tasks-- раскукоживаем старый массив
        this.setState({tasks: newTasks}) ///setState- метод реагирующий на изменение св-ва state
    }

    changeFilter=(newfilterValue)=>{
        this.setState({filterValue: newfilterValue});
        // alert(`Hello ${name}`);
    }

    changeStatus=(task, isDone)=>{
        let newTasks = this.state.tasks.map(t=>{
            if (t!==task){return t}
            else {return {...t, isDone: isDone}}
            });

        this.setState({tasks: newTasks});
    }


    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader addTask={this.addTask}/>
                    <TodoListTasks
                        changeStatus={this.changeStatus}
                        tasks={this.state.tasks.filter(t=>{
                        switch (this.state.filterValue) {
                            case "All":return true;
                            case "Completed": return t.isDone;
                            case "Active":return (!t.isDone);
                            default: return true;
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

App.propTypes = {
    // _________: PropTypes.string
};
