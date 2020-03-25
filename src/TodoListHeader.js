import React from "react";
import PropTypes from "prop-types";

class TodoListHeader extends React.Component {
    constructor(props) {
        super(props);
        this.newTaskTitleRef = React.createRef(); /////создали ссылку на элемент <input ref={this.newTaskTitleRef}>//
    }

    onAddTaskClick = () => {
        let newText = this.newTaskTitleRef.current.value; //обратились к ссылке на эл-т и взяли у нее текущее значение///
        this.props.addTask(newText); //вызвали ту ф-ю в родит. компоненте и подали в нее записаное в переменную newText значение инпута!
        this.newTaskTitleRef.current.value = "";/////обнуляет наш импут(10)
    }




    render = () => {
        return (
            <div className="">
                <div className="todoList-header">
                    <h3 className="todoList-header__title">What to Learn</h3>
                    <div className="todoList-newTaskForm">
                        {/* input!! мы привязываем эту ссылку ref={this.newTaskTitleRef} на тебя!!!*/}
                        <input ref={this.newTaskTitleRef} type="text" placeholder="New task name"/>
                        {/*по клику на кнопку произойдет вызов ф-ии onAddTaskClick*/}
                        <button onClick={this.onAddTaskClick}>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

TodoListHeader.propTypes = {
    // ________: PropTypes.____
};