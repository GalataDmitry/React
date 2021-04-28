import React, {Component} from 'react';

import TodoList from "../todo-list";
import SearchPanel from "../search-panel";
import AppHeader from "../app-header";
import ItemStatusFilter from "../item-status-filter";
import ItemAddForm from "../item-add-form";

import './app.css'


export default class App extends Component {

    maxId = 100;

    state = {
        todoData: [
            this.createTodoItem('Drink Coffee'),
            this.createTodoItem('Make Awesome App'),
            this.createTodoItem('Have a Lunch')
        ],
        term: ' '
    };

    createTodoItem(label) {
        return {
            label,
            important: false,
            done: false,
            id: this.maxId++
        };
    };


    deleteItem = (id) => {
        this.setState(({todoData}) => {
            const idx = todoData.findIndex((el) => el.id === id);
            /* const before = todoData.slice(0, idx);
             const after = todoData.slice(idx + 1);
             const newArray = [...before, ...after];*/
            const newArray = [...todoData.slice(0, idx),
                ...todoData.slice(idx + 1)];
            return {
                todoData: newArray
            };
        });
    };

    addItem = (text) => {
        const newItem = this.createTodoItem(text);

        this.setState(({todoData}) => {
            const nawArray = [
                ...todoData,
                newItem
            ];
            return {
                todoData: nawArray
            };
        });
    };

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex((el) => el.id === id);

        const oldItem = arr[idx];
        const newItem = {
            ...oldItem,
            [propName]: !oldItem[propName]
        }

        return [...arr.slice(0, idx),
            newItem,
            ...arr.slice(idx + 1)
        ];
    };

    /* const idx = todoData.findIndex ((el) => el.id === id);

           const oldItem = todoData[idx];
           const newItem = {...oldItem,
                            done: !oldItem.done}
           const newArray = [...todoData.slice(0, idx),
                                newItem,
                             ...todoData.slice(idx + 1)];
           return {
               todoData : newArray
           };*/

    onToggleDone = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            };
        });
    };

    onToggleImportant = (id) => {
        this.setState(({todoData}) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            };
        });
    };

    onSearchChange = (term) => {
        this.setState({term});
    };

    search(items, term) {
        if (term.length === 0) {
            return items;
        }
        return items.filter((item) => {
            return item.label
                .toLowerCase()
                .indexOf(term.toLowerCase()) > -1;
        });
    }

    render() {
        const {todoData, term} = this.state;
        const visibleItems = this.search(todoData, term);

        const doneCount = todoData
            .filter((elem) => elem.done).length;
        const todoCount = todoData.length - doneCount;

        /*const lenght = todoData.length;*/


        return (
            <div className='todo-app'>
                <AppHeader toDo={todoCount} done={doneCount}/>
                <div className='top-panel d-flex'>
                    <SearchPanel
                        onSearchChange={this.onSearchChange}/>
                    <ItemStatusFilter/>
                </div>

                <TodoList
                    todos={visibleItems}
                    onDeleted={this.deleteItem}
                    onToggleImportant={this.onToggleImportant}
                    onToggleDone={this.onToggleDone}
                />
                <ItemAddForm
                    onItemAdded={this.addItem}/>
            </div>
        );
    };
};