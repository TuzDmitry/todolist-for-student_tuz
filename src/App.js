import React from 'react';
import './App.css';


import PropTypes from "prop-types";
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodoListAC, setTodoListsAC} from "./reducer";
import axios from 'axios'


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
        debugger
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
            .then(res => {
                this.props.setTodolists(res.data)
                console.log(res.data);
            });
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
        axios.post(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title: newTodolistName},
            {
                withCredentials: true,
                headers: {"API-KEY": "99d1b1eb-87ca-41b0-b4eb-5da7df0ab7de"}
            }
        )
            .then(response => {
                if (response.data.resultCode === 0) {
                    // debugger
                    this.props.addTodoList(response.data.data.item)
                }
            })
        // let newTodoList = {
        //     title: newTodolistName, id: this.props.todolists.length,
        //     tasks: []
        // };
        //
        // this.nextTodoListId++;
        // this.props.addTodoList(newTodoList)
    }


    render = () => {
        // debugger;
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
            const action = addTodoListAC(newTodolistName)
            dispatch(action)
        },
        setTodolists: (todolists) => {
            // debugger
            dispatch(setTodoListsAC(todolists))
        }
    }
}


const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;


// App.propTypes = {
//     // _________: PropTypes.string
// };
