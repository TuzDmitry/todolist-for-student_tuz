import React from "react";
import PropTypes from "prop-types";

class TodoListTitle extends React.Component {

    state = {
        editMode: false,
        memoryTitle: '',
        editPriorityMode: false
    }

    activateEditMode = () => {
        this.setState({
            editMode: true,
            memoryTitle: this.props.title
        })
    }

    deActivateEditMode = () => {
        // debugger
        this.props.changeTodoTitle(this.props.id, this.state.memoryTitle)
        this.setState({
            editMode: false
        })
    }
    onTitleChanged = (e) => {
        this.setState({
            memoryTitle: e.currentTarget.value
        })
    }


    render = () => {
        // let classNameInput = this.state.error ? "error" : "";
        return (
            <>

                {
                    this.state.editMode
                        ? <input onBlur={this.deActivateEditMode}
                                 onChange={this.onTitleChanged}
                                 value={this.state.memoryTitle}
                                 autoFocus={true}/>
                        : <h3 onClick={this.activateEditMode} className="todoList-header__title">{this.props.title}</h3>
                }
            </>

        );
    }
}

export default TodoListTitle;

// AddNewItemForm.propTypes = {
//     // ________: PropTypes.____
// };