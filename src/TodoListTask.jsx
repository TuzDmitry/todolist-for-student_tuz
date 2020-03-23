import React from "react"
import PropTypes from 'prop-types';


class TodoListTask extends React.Component {
    render = () => {
        return (
            <div className="">
                <div className="todoList-tasks">
                    <div className="todoList-task">
                        <input type="checkbox" checked={this.props.isDone}/>
                        <span>{this.props.title}-{this.props.priority}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoListTask;

TodoListTask.propTypes = {
    isDone: PropTypes.bool,
    title: PropTypes.string,
    priority: PropTypes.string
};