import React from "react"
import PropTypes from 'prop-types';

class TodoListTask extends React.Component {

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0
        this.props.changeStatus(this.props.task, status)
    }

    onTitleChanged = (e) => {
        this.setState({
            memoryTitle: e.currentTarget.value
        })
    }

    onClickClose = () => {
        this.props.deleteTask(this.props.task.id)
    }

    state = {
        editMode: false,
        memoryTitle: '',
        editPriorityMode: false
    }
    activateEditMode = () => {
        this.setState({
            editMode: true,
            memoryTitle: this.props.task.title
        })
    }
    deActivateEditMode = () => {
        this.props.changeTitle(this.props.task, this.state.memoryTitle)
        this.setState({
            editMode: false
        })
    }
    onPriorityChanged = (e) => {
        let value = e.currentTarget.value;
        this.props.changePriority(this.props.task, value)
    }


    render = () => {
        let statusTasks = this.props.task.status
        let classForIsDone = statusTasks === 2 ? "done" : "todoList-task";
        let priora;
        switch (this.props.task.priority) {
            case 0:
                priora = 'low'
                break
            case 1:
                priora = 'middle'
                break
            case 2:
                priora = 'hi'
                break
            case 3:
                priora = 'urgently'
                break
            case 4:
                priora = 'later'
                break
            default:
                priora = 'hyi'
        }

        return (
            <div>
                <div className="taskContainer">
                    <div className={classForIsDone}>
                        <span>{this.props.task.id.slice(0, 4)}</span>
                        <input type="checkbox" onChange={this.onIsDoneChanged} checked={statusTasks === 2}/>

                        {/*<div>{this.props.task.id}</div>*/}
                        {
                            this.state.editMode
                                ? <input onBlur={this.deActivateEditMode}
                                         onChange={this.onTitleChanged}
                                         value={this.state.memoryTitle}
                                         autoFocus={true}/>
                                : <span onClick={this.activateEditMode}>-{this.props.task.title}, </span>
                        }

                        <span>priority:
                            {
                                this.state.editPriorityMode
                                    ? <select autoFocus={true} size="1"
                                              onBlur={() => this.setState({editPriorityMode: false})}
                                              onChange={this.onPriorityChanged}>
                                        <option selected={priora === 'low'}>low</option>
                                        <option selected={priora === 'medium'}>medium</option>
                                        <option selected={priora === 'hi'}>hi</option>
                                        <option selected={priora === 'urgently'}>urgently</option>
                                        <option selected={priora === 'later'}>later</option>
                                    </select>

                                    : <span onClick={() => this.setState({editPriorityMode: true})}>
                                        {priora}
                                    </span>
                            }
                        </span>
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