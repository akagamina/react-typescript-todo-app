import React, { useState } from 'react';
import { Modal, TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: 16,
        width: '25%'
    },
    input: {
        marginBottom: 16,
        width: '100%'
    },
    button: {
        textAlign: 'right',
        width: '100%'
    }
}));

export default function InputModal({ ...props }) {
    const classes = useStyles();
    const [value, setValue] = useState('');

    let { close, open, selectedTodo, editTodo } = props;

    return (
        <Modal
            className={classes.modal}
            open={open}
            onClose={close}
        >
            <div className={classes.paper}>
                <TextField
                    label={selectedTodo?.value}
                    variant="outlined"
                    className={classes.input}
                    onChange={(event: any) => setValue(event.target.value)}
                    defaultValue={selectedTodo?.value} />
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    size="large"
                    onClick={() => editTodo(value)}
                >
                    Edit
                </Button>
            </div>
        </Modal>
    );
}
