import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import PropTypes from "prop-types";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef(); /////создали ссылку на элемент <input ref={this.newTaskTitleRef}>//
        // setTimeout(() => {
        //         //     let newTask={title: "JS", isDone: true, priority: 'low'};
        //         //     /////...this.state.tasks-- раскукоживаем старый массив
        //         //     let newTasks=[...this.state.tasks, newTask]
        //         //     // this.state.tasks.push(newTask)
        //         //     this.setState({tasks:newTasks})
        //         // }, 2000);
    }


    state = {
        tasks: [
            {title: "JS", isDone: true, priority: 'low'},
            {title: "HTML", isDone: true, priority: 'high'},
            {title: "CSS", isDone: true, priority: 'low'},
            {title: "SaSS", isDone: false, priority: 'high'},
            {title: "React", isDone: false, priority: 'low'},
        ], filterValue: "Completed"
    }

    onAddTaskClick = () => {
        let newText = this.newTaskTitleRef.current.value; //обратились к ссылке на эл-т и взяли у нее текущее значение///
        let newTask = {title: newText, isDone: false, priority: 'low'};

        let newTasks = [...this.state.tasks, newTask] ///...this.state.tasks-- раскукоживаем старый массив
        this.setState({tasks: newTasks}) ///setState- метод реагирующий на изменение св-ва state
        this.newTaskTitleRef.current.value = "";/////обнуляет наш импут(10)
    }

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    {/*<TodoListHeader/>*/}
                    <div className="todoList-header">
                        <h3 className="todoList-header__title">What to Learn</h3>
                        <div className="todoList-newTaskForm">
                            {/* input!! мы привязываем эту ссылку ref={this.newTaskTitleRef} на тебя!!!*/}
                            <input ref={this.newTaskTitleRef}
                                   type="text"
                                   placeholder="New task name"/>
                            {/*по клику на кнопку произойдет вызов ф-ии onAddTaskClick*/}
                            <button onClick={this.onAddTaskClick}>add</button>
                        </div>
                    </div>
                    <TodoListTasks tasks={this.state.tasks}/>
                    <TodoListFooter filterValue={this.state.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;

App.propTypes = {
    // _________: PropTypes.string
};
