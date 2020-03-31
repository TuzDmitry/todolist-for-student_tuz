import React from "react";
import PropTypes from "prop-types";

class TodoListHeader extends React.Component {
    constructor(props) {
        super(props);
        // this.newTaskTitleRef = React.createRef(); //////////уже нам не нужен
        /////создали ссылку на элемент <input ref={this.newTaskTitleRef}>//
    }

    state = {
        error: true,
        title: ""
    }
    onAddTaskClick = () => {
        // let newText = this.newTaskTitleRef.current.value; //обратились к ссылке на эл-т и взяли у нее текущее значение///
        //
        // this.newTaskTitleRef.current.value = "";/////обнуляет наш импут(10)
        let newText = this.state.title;
        this.setState({title: ""})

        if (newText === "") {
            this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addTask(newText); //вызвали ту ф-ю в родит. компоненте и подали в нее записаное в переменную newText значение инпута!
        }


    }

    onTitleChanged = (e) => {
        this.setState({
            error: false,
            title: e.currentTarget.value
        })
    };

    onKeyPress = (e) => {
        if (e.key === "Enter") {
            this.onAddTaskClick()
        }
    };


    render = () => {
        let classNameInput = this.state.error ? "error" : "";
        return (
            <div className="">
                <div className="todoList-header">
                    <h3 className="todoList-header__title">What to Learn</h3>
                    <div className="todoList-newTaskForm">
                        {/* input!! мы привязываем эту ссылку ref={this.newTaskTitleRef} на тебя!!!*/}
                        <input
                            // ref={this.newTaskTitleRef}     ///уже нам не нужна
                            type="text"
                            className={classNameInput}
                            onChange={this.onTitleChanged}
                            value={this.state.title}
                            onKeyPress={this.onKeyPress}
                            placeholder="New task name"/>

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