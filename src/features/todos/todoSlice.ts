import { createSlice } from '@reduxjs/toolkit';

interface Lists {
    map(arg0: (item: { key: string; value: string; status: boolean; }) => JSX.Element): import("react").ReactNode;
    key: string,
    value: string,
    status: boolean
}

const initialState = {
    list: JSON.parse(window.localStorage.getItem('todoList')!) ?? [],
};


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, todo) => {
            state.list.push(todo.payload);
            window.localStorage.setItem('todoList', JSON.stringify(state.list));
        },
        doneTodo: (state, todo) => {
            state.list.map((item: Lists) => {
                if (item.key === todo?.payload?.key) item.status = true;
                return item;
            });
            window.localStorage.setItem('todoList', JSON.stringify(state.list));
        },
        editTodo: (state, todo) => {
            state.list.map((item: Lists) => {
                if (item.key === todo?.payload?.key) item.value = todo.payload.value;
                return item;
            });
            window.localStorage.setItem('todoList', JSON.stringify(state.list));
        },
        unDoneTodo: (state, todo) => {
            state.list.map((item: Lists) => {
                if (item.key === todo?.payload?.key) item.status = false;
                return item;
            });
            window.localStorage.setItem('todoList', JSON.stringify(state.list));
        },
        removeTodo: (state, todo) => {
            state.list = state.list.filter((item: Lists) => item.key !== todo.payload);
            window.localStorage.setItem('todoList', JSON.stringify(state.list));
        },
    },
});

export const { addTodo, removeTodo, doneTodo, unDoneTodo, editTodo } = todoSlice.actions;

export const todoList = (state: { todoList: { list: Lists; }; }) => state.todoList.list;

export default todoSlice.reducer;
