import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    todoList,
    addTodo,
    doneTodo,
    unDoneTodo,
    removeTodo,
    editTodo,
} from "./todoSlice";

import InputModal from "../../app/components/InputModal";
import { uuid } from "../../app/uuid";
import DoneIcon from "@material-ui/icons/Done";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";

const ENTER = "Enter";

type Item = {
    key: string;
    value: string;
    status: boolean;
};

export function Todos() {
    const list = useSelector(todoList);
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState("");
    const [modal, setModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<Item>();

    const handleSubmitOnEnter = (event: any) => {
        if (event.key === ENTER && inputValue.length > 0) {
            dispatch(addTodo({ key: uuid(), value: inputValue }));
            setInputValue("");
        }
    };
    const handleSubmitOnClick = () => {
        inputValue.length > 0 &&
            dispatch(addTodo({ key: uuid(), value: inputValue }));
        setInputValue("");
    };

    const openModal = (todoItem: Item) => {
        setSelectedTodo({ ...todoItem });
        setModal(true);
    };

    const handleEditTodo = (value: Item) => {
        dispatch(editTodo({ key: selectedTodo?.key, value: value }));
        setModal(false);
    };

    return (
        <main>
            <div className="card add">
                <div className="cb-container">
                    <button id="add-btn" onClick={() => handleSubmitOnClick()}>
                        +
                    </button>
                </div>
                <div className="txt-container">
                    <label htmlFor="addt">Create todo</label>
                    <input
                        type="text"
                        className="txt-input"
                        placeholder="Create a new todo..."
                        spellCheck="false"
                        autoComplete="off"
                        onChange={(event) => setInputValue(event.target.value)}
                        onKeyPress={(event) => handleSubmitOnEnter(event)}
                        value={inputValue}
                        id="addt"
                    />
                </div>
            </div>
            <ul className="todos">
                {list.map((item: Item) => (
                    <li key={item.key}>
                        <div className="item">
                            <span
                                onClick={() => openModal(item)}
                                className={`${item.status ? "done-item" : ""}`}
                            >
                                {item?.value}
                            </span>
                            <div>
                                <RemoveIcon
                                    fontSize="large"
                                    onClick={() => dispatch(removeTodo(item.key))}
                                    style={{ marginRight: 8 }}
                                />
                                {item.status ? (
                                    <ClearIcon
                                        fontSize="large"
                                        onClick={() =>
                                            dispatch(unDoneTodo({ key: item.key, status: false }))
                                        }
                                    />
                                ) : (
                                    <DoneIcon
                                        fontSize="large"
                                        onClick={() =>
                                            dispatch(doneTodo({ key: item.key, status: true }))
                                        }
                                    />
                                )}
                            </div>
                        </div>
                        <InputModal
                            open={modal}
                            close={() => setModal(false)}
                            selectedTodo={selectedTodo}
                            editTodo={(value: Item) => handleEditTodo(value)}
                        />
                    </li>
                ))}
            </ul>
        </main>
    );
}
