import React from "react";
import PropTypes from "prop-types";

class TodoListTitle extends React.Component {

    render = () => {
        // let classNameInput = this.state.error ? "error" : "";
        return (
                <h3 className="todoList-header__title">{this.props.title}</h3>
        );
    }
}

export default TodoListTitle;

// AddNewItemForm.propTypes = {
//     // ________: PropTypes.____
// };