import React from "react"
import PropTypes from 'prop-types';


class TodoListTask extends React.Component {

    onIsDoneChanged=(e)=>{
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
        // alert(e.currentTarget.checked);
    }

    render = () => {
        return (
            <div className="">
                <div className="todoList-tasks">
                    <div className="todoList-task">
                        <input type="checkbox" onChange={this.onIsDoneChanged} checked={this.props.task.isDone}/>
                        <span>{this.props.task.title}-{this.props.task.priority}</span>
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