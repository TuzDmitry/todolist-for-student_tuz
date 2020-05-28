import React from 'react';
import './App.css';


import PropTypes from "prop-types";
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoListAC, addTodoListTC, getTodolistsTC, setTodoListsAC} from "./reducer";
// import axios from 'axios'
import api from "./api";
import Preloader from "./Preloader";


class App extends React.Component {
    state = {
        todolists: [
            // {id: "01", title: "Dima"},
        ]
    }


    componentDidMount = () => {
        this.restoreState()
    }


    restoreState = () => {

        this.props.getTodolists()
        // api.getTodolists(this.props.id)
        //     .then(res => {
        //         this.props.setTodolists(res.data)
        //         console.log(res.data);
        //     });

    }

    nextTodoListId = 0;

    saveState = () => {
        ////устанавливаем в localStorage под ключом "our-state"  наш стейт переделанный в  джейсон строку JSON.stringify(this.state)
        localStorage.setItem("todolists", JSON.stringify(this.state));
    }

//     restoreState = () => {
//         ////объявляем наш стейт стартовый
//         let state = this.state;
//         //// считываем сохраненную ранее строку из localStorage
//         let stateAsString = localStorage.getItem("todolistsХ")
//         ////если таковая есть, то превращаем строку в объект и призваиваем стейту знаение из стораджа.
//         if (stateAsString) {
//             state = JSON.parse(stateAsString);
//         }
// ////устанавливаем стейт или пустой или востановленный в стейт
//         this.setState(state, () => {
//             ////одним махом в колбек сделаем сравнение счётчика для id
// // this.nextTaskId = this.state.tasks.length   код который можено заменить на строчки 44-48
//             this.state.todolists.forEach(todo => {
//                 if (todo.id >= this.nextTaskId) {
//                     this.nextTodoListId = todo.id + 1
//                 }
//             })
//         })
//     }

    addTodoList = (newTodolistName) => {
        this.props.addTodoList(newTodolistName)
        // axios.post(
        //     'https://social-network.samuraijs.com/api/1.1/todo-lists',
        //     {title: newTodolistName},
        //     {
        //         withCredentials: true,
        //         headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
        //     }
        // )
        //     api.createTodolist(newTodolistName)
        //     .then(response => {
        //         if (response.data.resultCode === 0) {
        //             // debugger
        //             this.props.addTodoList(response.data.data.item)
        //         }
        //     })
    }


    render = () => {
        // debugger;
        let todolists = this.props.todolists.map(tl => {
            return <TodoList key={tl.id} id={tl.id} title={tl.title} tasks={tl.tasks}/>
        })
        return (
            <>
                <Preloader isPreloader={this.props.isPreloaderTodo}/>
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
        todolists: state.todolists,
        isPreloaderTodo: state.isPreloaderTodo
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        // addTodoList: (newTodolistName) => {
        //     const action = addTodoListAC(newTodolistName)
        //     dispatch(action)
        // },

        addTodoList: (newTodolistName) => {
            const thunk = addTodoListTC(newTodolistName)
            dispatch(thunk)
        },
        // setTodolists: (todolists) => {
        //     // debugger
        //     dispatch(setTodoListsAC(todolists))
        // },
        getTodolists: () => {
            const thunk = getTodolistsTC()
            dispatch(thunk)
        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;


// App.propTypes = {
//     // _________: PropTypes.string
// };
