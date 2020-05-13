import React from "react"
import PropTypes from 'prop-types';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
        // alert(e.currentTarget.checked);
    }

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
        // alert(e.currentTarget.checked);
    }

    onClickClose= ()=>{
        this.props.deleteTask(this.props.task.id)
        // alert('hey')
    }

    state = {
        editMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true
        })
    }
    deActivateEditMode = () => {
        this.setState({
            editMode: false
        })
    }

    render = () => {
        let statusTasks=this.props.task.status
        let classForIsDone = statusTasks===2 ? "done" : "todoList-task";
        return (
            <div>
                <div className="taskContainer">
                    <div className={classForIsDone}>
                        <input type="checkbox" onChange={this.onIsDoneChanged} checked={statusTasks===2}/>

                        <span>{this.props.task.id}</span>
                        {
                            this.state.editMode
                                ? <input onBlur={this.deActivateEditMode}
                                         onChange={this.onTitleChanged}
                                         value={this.props.task.title}
                                         autoFocus={true}/>
                                : <span onClick={this.activateEditMode}>-{this.props.task.title},</span>
                        }

                        {/*<span onClick={this.activateEditMode}>-{this.props.task.title},</span>*/}
                        <span>priority:{this.props.task.priority}</span>
                    </div>
                    <button className="deleterTask" onClick={this.onClickClose}>x</button>
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