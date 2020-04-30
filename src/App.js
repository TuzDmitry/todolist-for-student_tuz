import React from 'react';
import './App.css';


import PropTypes from "prop-types";
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";

export const ADD_TODOLIST = "ADD_TODOLIST"

class App extends React.Component {
    state = {
        todolists: [
            // {id: "01", title: "Dima"},
            // {id: "02", title: "Victor"},
            // {id: "03", title: "Kolya"},
        ]
    }
    componentDidMount = () => {
        this.restoreState()
    }

    nextTodoListId = 0;

    saveState = () => {
        ////устанавливаем в localStorage под ключом "our-state"  наш стейт переделанный в  джейсон строку JSON.stringify(this.state)
        localStorage.setItem("todolists", JSON.stringify(this.state));
    }

    restoreState = () => {
        ////объявляем наш стейт стартовый
        let state = this.state;
        //// считываем сохраненную ранее строку из localStorage
        let stateAsString = localStorage.getItem("todolistsХ")
        ////если таковая есть, то превращаем строку в объект и призваиваем стейту знаение из стораджа.
        if (stateAsString) {
            state = JSON.parse(stateAsString);
        }
////устанавливаем стейт или пустой или востановленный в стейт
        this.setState(state, () => {
            ////одним махом в колбек сделаем сравнение счётчика для id
// this.nextTaskId = this.state.tasks.length   код который можено заменить на строчки 44-48
            this.state.todolists.forEach(todo => {
                if (todo.id >= this.nextTaskId) {
                    this.nextTodoListId = todo.id + 1
                }
            })
        })
    }

    addTodoList = (newTodolistName) => {
        // alert(todolistName)
        let newTodoList = {
            title: newTodolistName, id: this.props.todolists.length,
            tasks: []
        };
        debugger
        this.nextTodoListId++;
        this.props.addTodoList(newTodoList)
        // this.setState({todolists: [...this.state.todolists, newTodoList]}, this.saveState)
    }


    render = () => {
        debugger;
        let todolists = this.props.todolists.map(tl => {
            return <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>
        })
        return (
            <>
                <div>
                    <AddNewItemForm addItem={this.addTodoList}/>
                </div>
                <div className="App">
                    {todolists}
                    {/*<TodoList id={"01"}/>*/}
                    {/*<TodoList id={"02"}/>*/}
                </div>
            </>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTodoList: (newTodolistName) => {
            const action = {
                type: ADD_TODOLIST,
                newTodolistName: newTodolistName
            }
            dispatch(action)
        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp; ////написали вместо
// export default App;

// App.propTypes = {
//     // _________: PropTypes.string
// };
